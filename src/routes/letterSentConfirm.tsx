import Header from "../components/headers/Header.tsx";
import Button from "../components/buttons/Button.tsx";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import mascot from "../assets/home/mascot.svg"
import {useEffect} from "react";
import {toast} from "react-toastify";
import {RowButtonContainer} from "../components/buttons/ButtonContainer.ts";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`
export const Mascot = styled.img`
  width: 45%;
`

const LetterSentConfirm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { uniqueString, ownerName } = location.state || {};

    useEffect(() => {
        // uniqueString이 없으면 이전 페이지로 리다이렉트
        if (!uniqueString) {
            toast.error("잘못된 접근입니다. 편지함에서 다시 시도해주세요.");
            navigate(-1); // 이전 페이지로 이동
        }
        console.log("uniqueString, ownerName:", uniqueString, ownerName);
    }, [uniqueString, navigate]);

    return (
        <Wrapper>
            <Mascot src={mascot}></Mascot>
            <Header title={`${ownerName} 님에게 편지가 전달되었어요!`} fontSize={"25px"}/>
            <Header title={"작은 선물로\n마음을 표현 해보는 건 어떠세요?"} fontSize={"25px"}/>
            <RowButtonContainer>
                <Button type="button" text="좋아요!" size="small" color="black" onClick={() => {
                    navigate(`/wishlist/${uniqueString}`)
                }}/>
                <Button type="button" text="괜찮아요" size="small" color="white" onClick={() => {
                    navigate(`/gm-letter/${uniqueString}`)
                }}/>
            </RowButtonContainer>
        </Wrapper>
    )
}

export default LetterSentConfirm;