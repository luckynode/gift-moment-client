import { useState } from "react"
import { Detail, Form, Hug10, Hug18, Input, Submit250, Title, Wrapper } from "../components/SignupComponents";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");

    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const { target : {name, value}} = e;

        if (name === "name") setName(value);
        else if (name === "birth") setBirth(value);
        else if (name === "email") setEmail(value);
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // 테스트로 console 출력
            console.log(name, birth, email);
        } catch (error) {
            console.error("회원가입 오류 : ", error);
        }
    }

    return(
        <Wrapper>
            <Title>정보를 입력해 주세요!</Title>
            <Form onSubmit={onSubmit}>
                <Hug18>
                    <Input
                        onChange={onChange}
                        name="name"
                        value={name}
                        type="text"
                        placeholder="이름"
                        required
                    />
                    <Input 
                        onChange={onChange}
                        name = "birth"
                        value={birth}
                        type="text"
                        placeholder="생년월일"
                        required
                    />
                    <Input 
                        onChange = {onChange}
                        name = "email"
                        value={email}
                        type="email"
                        placeholder="이메일"
                        required
                    />
                </Hug18>
                <Hug10>
                    <Submit250
                        type="submit" 
                        value="선물 등록하러 가기"
                    />
                    <Detail>선물은 최대 5개까지 등록 가능합니다.</Detail>
                </Hug10>
            </Form>
        </Wrapper>
    )
}