import Header from "../../components/headers/Header.tsx";
import styled from "styled-components";
import mascot from "../../assets/home/mascot.svg"
import {Wrapper} from "../letters/letterSentConfirm.tsx";

export const Mascot = styled.img`
  width: 45%;
`

const PaymentRequestComplete = () => {
    return (
        <Wrapper>
            <Mascot src={mascot}></Mascot>
            <Header title={"송금 신청이 완료되었습니다."}/>
            <Header title={"48시간 이내 입력된 계좌로\n송금 예정입니다!"}/>
        </Wrapper>
    )
}

export default PaymentRequestComplete;