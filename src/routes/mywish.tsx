import { Hug18, Submit250, Title, Wrapper } from "../components/SignupComponents";

export default function Mywish() {
    return(
        <Wrapper>
            <Title>name 님의 위시리스트</Title>
            <Title>확인하러 가볼까요?</Title>
            <Hug18>
                <Submit250
                    type="button"
                    value="편지함 보러가기"
                />
                <Submit250
                    type="button"
                    value="위시리스트 보러가기"
                />
            </Hug18>
        </Wrapper>
    )
}