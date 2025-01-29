import {useEffect, useState} from 'react';
import Header from '../components/headers/Header.tsx';
import Button from '../components/buttons/Button.tsx';
import Cake from '../components/letters/Cake.tsx';
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LetterDetailModal from "../components/letters/LetterDetailModal.tsx";
import {ornamentImages} from '../assets/ornamentImages.ts';
import {ornamentPositions} from '../assets/ornamentImages.ts';

import InstructionText from "../components/InstructionText.tsx";
import {useNavigate} from "react-router-dom";
import BackButton from "../components/buttons/BackButton.tsx";
import {copyLetterUrl, getMyLetters} from "../apis/myLetterApi.ts";
import {Letter} from "../types/api/myLetter.ts";
import {ColumnButtonContainer} from "../components/buttons/ButtonContainer.ts";
import {Wrapper} from "../components/SignupComponents.ts";

const MyLetters = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("눈송이");
    const [beforeBirthday, setBeforeBirthday] = useState(false);
    const [letters, setLetters] = useState<Letter[]>([]);
    const [totalLetters, setTotalLetters] = useState(14);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<{
        id: number;
        to: string;
        from: string;
        content: string;
    } | null>(null);

    useEffect(() => {
        const fetchLetters = async () => {
            try {
                const response = await getMyLetters();
                if (response.status === "success") {
                    console.log(response.data);
                    const {username, before_birthday, total_letters, letters} = response.data;
                    setUsername(username);
                    setBeforeBirthday(before_birthday);
                    setTotalLetters(total_letters);
                    setLetters(letters);
                } else {
                    console.error("편지 데이터 가져오기 실패:", response.message);
                }
            } catch (error) {
                console.error("편지 데이터 가져오기 실패:", error);
            }
        }
        fetchLetters();
    }, []);


    const handleItemClick = (id: number) => {
        if (!beforeBirthday) { // 생일이 지나면 편지 열람 가능
            const letter = letters.find((letter) => letter.id === id);
            setSelectedLetter(
                letter
                    ? {id: letter.id, to: letter.recipient_to, from: letter.sender_name, content: letter.content}
                    : null
            ); // 선택한 편지 데이터 설정
            setIsModalOpen(true); // 모달 열기
        }
    };

    const closeModal = () => setIsModalOpen(false); // 모달 닫기

    // 표시할 장신구 데이터 생성
    const items = ornamentImages.slice(0, totalLetters).map((src, index) => ({
        id: letters[index]?.id || index, // letters 배열의 id로 설정
        src,
        top: ornamentPositions[index].top,
        left: ornamentPositions[index].left,
        onClick: () => handleItemClick(letters[index]?.id || index), // letters의 id 전달
    }));

    const copyLinkToClipboard = async () => {

        try {
            const response = await copyLetterUrl();
            if (response.status == "success") {
                const letterLink = response.data.letter_link;
                // 프론트 주소 prefix 붙이기
                const frontendBaseUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

                const fullLetterLink = frontendBaseUrl + letterLink;
                console.log('링크 복사 성공:', fullLetterLink);

                navigator.clipboard.writeText(fullLetterLink)
                    .then(() => {
                        toast.success(
                            <>
                                링크가 복사되었습니다! <br/>
                                친구들에게 생일을 공유하세요! ☺️
                            </>,
                            {
                                position: "top-center",
                                autoClose: 5000,
                            }
                        );
                    })
                    .catch((err) => {
                        console.error('링크 복사 실패:', err);
                    });
            } else {
                console.error('링크 복사 실패:', response.message);
            }
        } catch (error) {
            console.error('링크 복사 실패:', error);
        }
    };

    return (
        <>
            <Wrapper>
                <BackButton/>
                <Header title={`${username} 님의 편지함`}/>
                <Cake items={items}/> {/* items를 Cake에 전달 */}
                <InstructionText
                    iconText="Notice"
                    message={
                        beforeBirthday
                            ? `편지는 생일 날 공개됩니다!`
                            : `장신구를 클릭해 보세요!\n편지 내용을 볼 수 있습니다`
                    }
                />
                <ColumnButtonContainer>
                    <Button text="마이페이지" size="large" color="white" onClick={() => navigate("/mypage")}/>
                    <Button text="편지 링크 복사하기" size="large" color="black" onClick={copyLinkToClipboard}/>
                </ColumnButtonContainer>
                <LetterDetailModal isOpen={isModalOpen} onClose={closeModal} letter={selectedLetter}/>
            </Wrapper>
        </>
    );
};

export default MyLetters;