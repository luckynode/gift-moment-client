import styled from "styled-components"
import logoimg from "../assets/home/logo.svg"
import introimg from "../assets/home/intro.svg"
import KakaoBtn from "../components/oauth/Kakao"

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Logo = styled.img`
    width: 95%;
`

const Intro = styled.img`
    margin-top: 40px;
    margin-bottom: 20px;
`

export default function Login() {
    return(
        <Wrapper>
            <Logo src={logoimg} />
            {/* TODO 로그인 멘트 변경 이미지 변경 */}
            <Intro src={introimg} />
            <KakaoBtn />
        </Wrapper>
    )
}