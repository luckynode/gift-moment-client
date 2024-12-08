import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import Header from "../components/headers/Header";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 수직가운데 */
    justify-content: flex-start;
    padding-top: 70px;
`

const Subtitle = styled.div`
    font-size: 25px;
    font-family: 'Lato';
    color: transparent;
    display: inline-block;
    background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); /* 중앙만 살짝 연하게 */
    background-clip: text;
`

export default function WishList() {
    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>00월 00일 D-00</Subtitle>
                <Header title="000님의 위시리스트" />
                {/* map 으로 개수만큼 반복 */}
                {/* 사진
                이름 % 진행중
                progress bar */}
                {/* 5개보다 작을 때 추가 버튼 */}
            </Wrapper>
        </>
    )
}