import styled from "styled-components"
import logoimg from "../assets/home/LOGO.svg"
import introimg from "../assets/home/INTRO.svg"
import KakaoBtn from "../components/Kakao"

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 750px;
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