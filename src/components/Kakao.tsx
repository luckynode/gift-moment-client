import styled from "styled-components";
import kimg from "/klogin.svg"

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;

    width: 160px;
    height: 40px;

    background: url(${kimg}) no-repeat center center;
    border: none;
    cursor: pointer;
    
    &:hover {
        opacity: 0.7;
    }
`

export default function KakaoBtn(){
    const login = () => {}
    
    return (
        <Button onClick={() => login} />
    )
}