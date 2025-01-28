import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from '../components/headers/Header.tsx';
import Button from '../components/buttons/Button.tsx';
import Cake from '../components/letters/Cake.tsx';
import "react-toastify/dist/ReactToastify.css";
import {ornamentImages} from '../assets/ornamentImages.ts';
import {ornamentPositions} from '../assets/ornamentImages.ts';

import InstructionText from "../components/InstructionText.tsx";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/buttons/BackButton.tsx";
import {getGuestLetters} from "../apis/guestLetterApi.ts";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;


const GuestLetters = () => {
    const {uniqueString} = useParams();
    const navigate = useNavigate();

    const [ownerName, setOwnerName] = useState("눈송이");
    const [beforeBirthday, setBeforeBirthday] = useState(true);
    const [letterCount, setLetterCount] = useState(14);

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
            }
        }
        fetchData();
    }, [uniqueString, navigate]);

    return (
        <>
            <Wrapper>
                <BackButton/>
                <Header title={`${ownerName}님의 편지함`}/>
                <Cake items={items}/> {/* items를 Cake에 전달 */}
                <InstructionText
                    iconText="Notice"
                    message={
                        beforeBirthday
                            ? `생일을 함께 축하해주세요!\n편지 작성 후 선물 전달이 가능합니다!`
                            : `편지 전달 기간이 종료되었습니다!`
                    }
                />
                {beforeBirthday ? (
                    <ButtonContainer>
                        <Button type="button" text="편지 쓰러 가기" size="large" color="white"
                                onClick={() => navigate("/write-letter", {state: {uniqueString, ownerName}})}/>
                        <Button type="button" text="위시리스트 보러 가기" size="large" color="black"
                                onClick={() => navigate(`/wishlist/${uniqueString}`)}/>
                    </ButtonContainer>
                ) : ""}
            </Wrapper>
        </>
    );
};

export default GuestLetters;