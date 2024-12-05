import { useEffect, useState } from "react";
import { Title, Wrapper, Input, Hug18 } from "../components/SignupComponents";
import Button from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TODO data type 확인

interface User {
    name: string;
    birth: string;
    email: string;
    bank: string;
    account: string;
}

export default function Mypage() {
    // const [user, setUser] = useState<User>({
    //     name: '이름',
    //     birth: '0',
    //     email: "email",
    //     bank: "bank",
    //     account: '0',
    // })

    const [user, setUser] = useState<User | null>(null); // 초기값을 null로 설정


    const navigate = useNavigate();

    useEffect(()=> {
        const fetchData = async() => {
            try {
                // TODO accesstoken 설정

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mypage`, {
                    headers: {
                        // Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error("Fetchdata error : ", error);
            }
        };
        fetchData();
    }, []);

    return(
        <Wrapper>
            <Title>마이페이지</Title>
            <Hug18>
                <Input 
                    name="name"
                    value={user?.name || '김눈송'}
                    type="text"
                    placeholder="이름"
                    disabled
                />
                <Input 
                    name="birth"
                    value={user?.birth || '000000'}
                    type="text"
                    placeholder="생년월일"
                    disabled
                />
                <Input 
                    name="email"
                    value={user?.email || 'email@email.com'}
                    type="email"
                    placeholder="이메일"
                    disabled
                />
                <Input 
                    name="bank"
                    value={user?.bank || '숙명은행'}
                    type="text"
                    placeholder="은행"
                    disabled
                />
                <Input 
                    name="account"
                    value={user?.account || '000000000000'}
                    type="text"
                    placeholder="계좌번호"
                    disabled
                />
                <Button 
                    type="button"
                    text="편집"
                    size="small"
                    color="white"
                    onClick={() => {navigate("/mypage/edit")}}
                />
                <Button 
                    type="button"
                    text="로그아웃"
                    size="small"
                    color="black"
                    onClick={() => {navigate("/mypage/edit")}}
                />
            </Hug18>
        </Wrapper>
    )
} 