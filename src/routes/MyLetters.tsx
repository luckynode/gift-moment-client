import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/headers/Header.tsx';
import Button from '../components/buttons/Button.tsx';
import Cake from '../components/letters/Cake.tsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LetterDetailModal from "../components/letters/LetterDetailModal";
import { ornamentImages } from '../assets/ornamentImages';
import { ornamentPositions } from '../assets/ornamentImages';

import InstructionText from "../components/InstructionText.tsx";
import {useNavigate} from "react-router-dom";
import BackButton from "../components/buttons/BackButton.tsx";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ColumnButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;


// NOTE 현재는 하드코딩된 값 사용. 나중에 동적으로 처리 필요
const MyLetters = () => {
    const navigate = useNavigate();

    const letters = [
        {
            id: 0,
            to: "사랑하는 럭키에게",
            from: "송이가",
            content: "안녕 나는 너의 대학 동기 송이야 \n" +
                "일단 생일을 너무 축하해♥️ \n" +
                "🎉🥳HAPPY BIRTHDAY🎉🥳\n" +
                "\n" +
                "우리 중앙 동아리 SOLUX에서 처음 만났을 때 기억나?? \n" +
                "그때, 너랑 금방 친해질 수 있었던 게 정말 신기했어. \n" +
                "\n" +
                "늘 고맙고, 오늘은 생일이니까 코딩할 생각하지 말고, 맘껏 즐겨!!\n" +
                "그리고 앞으로 나랑 계속 모각코 해줘야 돼 알겠지?? 😉\n" +
                "\n" +
                "다시 한번 생일 축하하고 \n" +
                "힘들 때 연락해! 언제나 내가 너 곁에 있다는 걸 잊지마!\n" +
                "즐거운 하루 보내~~~\n" +
                "💟 💟 💟 💟 💟 ",
        },
    ];

    const [isBirthday, setIsBirthday] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<{
        id: number;
        to: string;
        from: string;
        content: string;
    } | null>(null);

    // TODO 백엔드 API로부터 오늘이 생일인지 여부 받아오기
    //      생일이면 생일 축하 문구 페이지부터 띄우기
    //      생일이 아니면 편지 상세보기 불가능

    // TODO 백엔드 API로부터 내 편지 개수 받아오기
    const [letterCount] = useState<number>(14);

    const handleItemClick = (id: number) => {
        if (isBirthday) {
            // TODO 백엔드 API로부터 편지 받아오기
            const letter = letters.find((letter) => letter.id === id);
            setSelectedLetter(letter); // 선택한 편지 데이터 설정
            setIsModalOpen(true); // 모달 열기
        } else {
            // TODO 토스트 메시지 예쁘게 수정
            toast.success("편지는 생일 이후에 공개됩니다! ☺️️", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const closeModal = () => setIsModalOpen(false); // 모달 닫기

    // 표시할 장신구 데이터 생성
    const items = ornamentImages.slice(0, letterCount).map((src, index) => ({
        id: index,
        src,
        top: ornamentPositions[index].top,
        left: ornamentPositions[index].left,
        onClick: () => handleItemClick(index),
    }));

    const copyLinkToClipboard = () => {
        // TODO 백엔드 API로부터 사용자 고유 링크 url 받기
        const currentUrl = window.location.href; // 현재 URL 가져오기
        navigator.clipboard.writeText(currentUrl)  // URL을 클립보드에 복사
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
    };

    return (
        <>
        <Wrapper>
            {/*TODO 백엔드 API 유저 정보 받아오기*/}
            <BackButton/>
            <Header title="경희님의 편지함"/>
            <Cake items={items}/> {/* items를 Cake에 전달 */}
            <InstructionText iconText="Letter" message={`장신구를 클릭해 보세요!\n편지 내용을 볼 수 있습니다`}/>
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