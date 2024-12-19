import Header from "../components/headers/Header.tsx";
import Button from "../components/buttons/Button.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import mascot from "../assets/home/mascot.svg"

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`

export const RowButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

export const Mascot = styled.img`
  width: 45%;
`

const LetterSentConfirm = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Mascot src={mascot}></Mascot>
            <Header title={"OOO님에게 편지가 전달되었어요!"} fontSize={"25px"}/>
            <Header title={"작은 선물로\n마음을 표현 해보는 건 어떠세요?"} fontSize={"25px"}/>
            <RowButtonContainer>
                <Button type="button" text="좋아요!" size="small" color="black" onClick={() => {
                    navigate("/login")
                }}/>
                <Button type="button" text="괜찮아요" size="small" color="white" onClick={() => {
                    navigate("/guest-letters")
                }}/>
            </RowButtonContainer>
        </Wrapper>
    )
}

export default LetterSentConfirm;