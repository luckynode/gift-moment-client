import Header from "../components/headers/Header.tsx";
import Button from "../components/buttons/Button.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import mascot from "../assets/home/mascot.svg"
import {ColumnButtonContainer} from "../pages/MyLetters.tsx";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 750px;
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
            <Header title={"OOO님!\n00월 00일 생일을\n진심으로 축하드립니다♥ "}/>
            <ColumnButtonContainer>
                <Button type="button" text="편지 보러 가기" size="large" color="black" onClick={() => {
                    navigate("/my-letters")
                }}/>
                <Button type="button" text="선물 보러 가기" size="large" color="black" onClick={() => {
                    navigate("/wishlist")
                }}/>
            </ColumnButtonContainer>
        </Wrapper>
    )
}

export default LetterSentConfirm;