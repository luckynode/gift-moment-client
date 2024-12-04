import { useState } from "react";
import { Form, Hug18, Input, Submit100, SubTitle, Title, Wrapper } from "../../components/SignupComponents";

interface GetInfoProps {
    onNext: () => void;
}

export default function AccountInput({ onNext } : GetInfoProps){
    const [bank, setBank] = useState("");
    const [account, setAccount] = useState("");
    
    const onChange = async(e : React.ChangeEvent<HTMLInputElement>) => {
        const { target : {name, value}} = e;

        if (name === "bank") setBank(value);
        else if (name === "account") setAccount(value);
    }
    
    const onSubmit = async (e : React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // test로 콘솔 출력
            console.log(bank, account);

            // TODO 서버 axios post

            onNext();
        } catch (error) {
            console.error("정보 제출 오류 : ", error);
        }

    }
    
    return(
        <Wrapper>
            <Title>앗!</Title>
            <Title>계좌가 등록되어 있지 않아요.</Title>
            <SubTitle>계좌 먼저 등록해 주세요. ◡̈⋆*</SubTitle>
            <Form onSubmit={onSubmit}>
                <Hug18>
                    {/* TODO type 확인 */}
                    <Input
                        onChange={onChange}
                        name="bank"
                        value={bank}
                        placeholder="은행"
                        required
                    />
                    <Input
                        onChange={onChange}
                        name="account"
                        value={account}
                        placeholder="계좌번호"
                        required
                    />
                    <Submit100
                        type="submit" 
                        value="등록"    
                    />
                </Hug18>
            </Form>
        </Wrapper>
    )
}