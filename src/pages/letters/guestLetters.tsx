import {useEffect, useState} from 'react';
import Header from '../../components/headers/Header.tsx';
import Button from '../../components/buttons/Button.tsx';
import Cake from '../../components/letters/Cake.tsx';
import "react-toastify/dist/ReactToastify.css";
import {ornamentImages} from '../../assets/letters/ornamentImages.ts';
import {ornamentPositions} from '../../assets/letters/ornamentImages.ts';
import InstructionText from "../../components/common/InstructionText.tsx";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../../components/buttons/BackButton.tsx";
import {getGuestLetters} from "../../apis/guestLetterApi.ts";
import {ColumnButtonContainer} from "../../components/buttons/ButtonContainer.ts";
import {Wrapper} from "../../components/auth/SignupComponents.ts";
import Loading from "../../components/common/loading.tsx";

const GuestLetters = () => {
    const {uniqueString} = useParams();
    const navigate = useNavigate();

    const [ownerName, setOwnerName] = useState<string>("눈송이");
    const [beforeBirthday, setBeforeBirthday] = useState<boolean>(true);
    const [letterCount, setLetterCount] = useState<number>(14);
    const [loading, setLoading] = useState(true);

    // 표시할 장신구 데이터 생성
    const items = ornamentImages.slice(0, letterCount).map((src, index) => ({
        id: index,
        src,
        top: ornamentPositions[index].top,
        left: ornamentPositions[index].left,
        onClick: () => {
        },
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (uniqueString) {
                    const response = await getGuestLetters(uniqueString);
                    if (response.status === "success") {
                        console.log("게스트 편지 조회 성공:", response.data);

                        const {birthday_owner_name, before_birthday, total_letters} = response.data;
                        setOwnerName(birthday_owner_name);
                        setBeforeBirthday(before_birthday);
                        setLetterCount(total_letters);
                    } else {
                        console.error("게스트 편지 조회 실패:", response.message);
                    }
                }
            } catch (error) {
                console.error("게스트 편지 조회 실패:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [uniqueString, navigate]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <Wrapper>
                <BackButton/>
                <Header title={`${ownerName}님의 편지함`}/>
                <Cake items={items}/>
                <InstructionText
                    iconText="Notice"
                    message={
                        beforeBirthday
                            ? `생일을 함께 축하해주세요!\n편지 작성 후 선물 전달이 가능합니다!`
                            : `편지 전달 기간이 종료되었습니다!`
                    }
                />
                {beforeBirthday ? (
                    <ColumnButtonContainer>
                        <Button type="button" text="편지 쓰러 가기" size="large" color="white"
                                onClick={() => navigate("/write-letter", {state: {uniqueString, ownerName}})}/>
                        <Button type="button" text="위시리스트 보러 가기" size="large" color="black"
                                onClick={() => navigate(`/wishlist/${uniqueString}`)}/>
                    </ColumnButtonContainer>
                ) : ""}
            </Wrapper>
        </>
    );
};

export default GuestLetters;