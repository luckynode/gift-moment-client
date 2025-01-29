import { useEffect, useState } from "react"
import { Detail, Form, Hug10, Hug18, Input, Title, Wrapper } from "../../components/auth/SignupComponents.ts";
import axios from "axios";
import Button from "../../components/buttons/Button";

interface GetInfoProps {
    onNext: () => void; // onNext 함수 타입 정의
}

export default function GetInfo({ onNext } : GetInfoProps) {
    const [name, setName] = useState("김이름");
    const [email, setEmail] = useState("email@email.com");
    const [birth, setBirth] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`,
                    }
                });
                const {name, email} = response.data.data;

                // data 존재하면 불러오기
                if (name) setName(name);

                if (email) setEmail(email);

            } catch (error) {
                console.error("Data fetch error : ", error);
            }
        };

        fetchData();
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
            const jwt_token = localStorage.getItem("jwt_token");
            const formattedBirthDate = new Date(birth).toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
            
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/profile`, {
                name: name,
                birth_date: formattedBirthDate,
                email: email,
            }, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json', // Content-Type 설정
                }
            });

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
                    />
                    <Input 
                        onChange={onChange}
                        name = "birth"
                        value={birth}
                        type="date"
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
                    <Button 
                        type="submit"
                        text="선물 등록하러 가기"
                        size="large"
                        color="black"
                        onClick={() => {}}
                    />
                    <Detail>선물은 최대 5개까지 등록 가능합니다.</Detail>
                </Hug10>
            </Form>
        </Wrapper>
    )
}