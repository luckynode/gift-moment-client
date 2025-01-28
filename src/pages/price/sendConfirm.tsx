import Header from "../../components/headers/Header.tsx";
import Button from "../../components/buttons/Button.tsx";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import mascot from "../../assets/home/mascot.svg"

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
    const { userId } = useParams<{ userId: string }>();
    
    const friend_name = localStorage.getItem('friend_name');
    return (
        <>
        <Wrapper>
            <Mascot src={mascot}></Mascot>
            <Header title={`${friend_name || "김친구"} 님에게 선물이 전달되었어요!`} fontSize={"25px"}/>
            <RowButtonContainer>
                <Button type="button" text="확인" size="small" color="black" onClick={() => {
                    navigate(`/wishlist/${userId}`); // 사용자 ID에 맞춰 이동
                }}/>
            </RowButtonContainer>
        </Wrapper>
        </>
    )
}