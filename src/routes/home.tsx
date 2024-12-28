import styled from "styled-components"
import logoimg from "../assets/home/logo.svg"
import introimg from "../assets/home/intro.svg"
import KakaoBtn from "../components/oauth/Kakao"
import Confetti from 'react-confetti'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`

const Logo = styled.img`
    width: 95%;
    z-index: 2;
`

const Intro = styled.img`
    margin-top: 40px;
    margin-bottom: 20px;
    z-index: 2;
`

export default function Home() {
    return(
        <Wrapper>
            <Confetti
                numberOfPieces={100}
                colors={['#F6416C', '#00B8A9', '#FFDE7D', '#F8F3D4']}
            />
            <Logo src={logoimg} />
            <Intro src={introimg} />
            <KakaoBtn />
        </Wrapper>
    )
}