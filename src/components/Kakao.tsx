import styled from "styled-components";
import path from "/kakaoLogo.svg"

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;

    width: 160px;
    height: 40px;

    background: #FEE500;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`

export default function KakaoBtn(){
    const login = () => {}
    
    return (
        <Button onClick={() => login}>
            <img src={path} />
            카카오 로그인
        </Button>
    )
}