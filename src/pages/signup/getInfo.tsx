import { useEffect, useState } from "react"
import { Detail, Form, Hug10, Hug18, Input, Submit250, Title, Wrapper } from "../../components/SignupComponents";
import axios from "axios";

interface GetInfoProps {
    onNext: () => void; // onNext 함수 타입 정의
}

export default function GetInfo({ onNext } : GetInfoProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");

    const [isNameDisabled, setIsNameDisabled] = useState(false);
    const [isEmailDisabled, setIsEmailDisabled] = useState(false);
    const [isBirthDisabled, setIsBirthDisabled] = useState(false);

    useEffect(() => {
        // 토큰 설정 추가
        // TODO 서버 토큰 header

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`);
                const {name, birth, email} = response.data.data;

                // data 존재하면 불러옴과 동시에 비활성화
                if (name) {
                    setName(name);
                    setIsNameDisabled(true);
                } 
                
                if (birth) {
                    setBirth(birth);
                    setIsBirthDisabled(true);
                }

                if (email) {
                    setEmail(email);
                    setIsEmailDisabled(true);
                }
            } catch (error) {
                console.error("Data fetch error : ", error);
            }
        };

        // fetchData();
    }, []);

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

            // TODO 서버 axios post.

            onNext();
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
                        disabled={isNameDisabled}
                    />
                    <Input 
                        onChange={onChange}
                        name = "birth"
                        value={birth}
                        type="text"
                        placeholder="생년월일"
                        required
                        disabled={isBirthDisabled}
                    />
                    <Input 
                        onChange = {onChange}
                        name = "email"
                        value={email}
                        type="email"
                        placeholder="이메일"
                        required
                        disabled={isEmailDisabled}
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