import Header from "../components/headers/Header.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Button from "../components/buttons/Button.tsx";
import {Wrapper} from "./lletterSentConfirm.tsx";
import BackButton from "../components/buttons/BackButton.tsx";

const PaymentWrapper = styled(Wrapper)`
  gap: 50px;
`;

const SubHeader = styled.div`
  font-size: 28px;
  font-weight: 400;
  font-family: 'pretendard', serif;
  color: transparent;
  display: inline-block;
  background: linear-gradient(to bottom, #924c57 0%, #b62f45 30%, #b72f54 60%, #924c57 100%);
  background-clip: text;
`;

const WishInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 330px;
  min-height: 50px;
  box-sizing: border-box;
  padding: 10px;
  font-size: 20px;
  font-family: 'Lato';
  font-weight: 500;
  background: #ffffff;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
`;

const WishDisabledInput = styled(WishInput)`
  background: #eee2e2;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const AccountInfo = styled(Info)`
  gap: 20px;
`;

interface WishItem {
    id: number;
    name: string;
}

interface PaymentData {
    bank: string;
    account: string;
    totalAmount: number;
    SuccessWishItems: WishItem[];
}

const PaymentRequest = () => {
    const navigate = useNavigate();

    // 정적 데이터
    const paymentData: PaymentData = {
        bank: "카카오뱅크",
        account: "3333-38-019-0",
        totalAmount: 2500000,
        SuccessWishItems: [
            {id: 1, name: "쿠로미 에어팟 케이스"},
            {id: 2, name: "아이폰 16 Pro"},
        ],
    };

    return (
        <PaymentWrapper>
            <BackButton/>
            <Info>
                <Header title="달성 위시아이템" fontSize="28px" hasBorder="true"/>

                {/* SuccessWishItems 동적 렌더링 */}
                {paymentData.SuccessWishItems.map((item) => (
                    <SubHeader key={item.id}>{item.name}</SubHeader>
                ))}
            </Info>
            <Info>
                <Header title="총 금액" fontSize="28px" hasBorder="true"/>
                <SubHeader>{paymentData.totalAmount.toLocaleString()}원</SubHeader>
            </Info>
            <AccountInfo>
                <Header title="아래 계좌로 송금됩니다." fontSize="28px"/>

                {/* 계좌 정보 */}
                <WishDisabledInput>{paymentData.bank || "은행 정보 없음"}</WishDisabledInput>
                <WishDisabledInput>{paymentData.account || "계좌 정보 없음"}</WishDisabledInput>

                <Button
                    type="button"
                    text="송금"
                    size="small"
                    color="black"
                    onClick={() => navigate("/payment-request-complete")}
                />
            </AccountInfo>
        </PaymentWrapper>
    );
};

export default PaymentRequest;
