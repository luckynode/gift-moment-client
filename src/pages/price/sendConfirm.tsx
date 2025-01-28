import Header from "../../components/headers/Header.tsx";
import Button from "../../components/buttons/Button.tsx";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import mascot from "../../assets/home/mascot.svg"
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`

const RowButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Mascot = styled.img`
  width: 45%;
`

export default function SendConfirm() {
    const navigate = useNavigate();
    const uniqueString = localStorage.getItem('uniqueString');
    const friend_name = localStorage.getItem('friend_name');

    useEffect(() => {
        // 로컬저장소 필요 없는 내용 삭제
		// amount gift_id tid member_id(현재는 생일 당사자 id이지만 추후 선물 주는 사람 id로 변경)
		localStorage.removeItem('amount');
		localStorage.removeItem('gift_id');
		localStorage.removeItem('tid');
		localStorage.removeItem('memberId');
    }, []);

    return (
        <>
        <Wrapper>
            <Mascot src={mascot}></Mascot>
            <Header title={`${friend_name} 님에게 선물이 전달되었어요!`} fontSize={"25px"}/>
            <RowButtonContainer>
                <Button type="button" text="확인" size="small" color="black" onClick={() => {
                    navigate(`/wishlist/${uniqueString}`); // 사용자 ID에 맞춰 이동
                }}/>
            </RowButtonContainer>
        </Wrapper>
        </>
    )
}