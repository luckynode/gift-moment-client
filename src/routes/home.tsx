import styled from "styled-components"
import logoimg from "../assets/home/LOGO.svg"
import introimg from "../assets/home/INTRO.svg"
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

export default function Home() {
    return(
        <Wrapper>
            <Logo src={logoimg} />
            <Intro src={introimg} />
            <KakaoBtn />
        </Wrapper>
    )
}