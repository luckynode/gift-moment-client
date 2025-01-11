import { useEffect, useState } from "react";
import { Title, Wrapper, Hug18 } from "../components/SignupComponents";
import Button from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BackButton from "../components/buttons/BackButton";

const Row18 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
`
const Input = styled.input`
    box-sizing: border-box;
    width: 330px;
    height: 50px;
    font-size: 20px;
    top: 0px;

    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 8px;

    padding-left: 15px;

    &:disabled {
        background: #FFFFFF;
        color: #000;
        border-color: #C8C8C8;
        opacity: 1;
    }
`

// TODO data type 확인

interface User {
    name: string;
    birth_date: string;
    email: string;
    bank_code: string;
    account_number: string;
}

export default function Mypage() {
    // 값 불러올 때 초기값 설정
    // const [user, setUser] = useState<User>({
    //     name: '이름',
    //     birth: '0',
    //     email: "email",
    //     bank: "bank",
    //     account: '0',
    // })

    const [user, setUser] = useState<User | null>(null); // 초기값을 null로 설정

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // TODO accesstoken 설정
            
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
                headers: {
                    // Authorization: `Bearer ${accessToken}`,
                }
            });

            // TODO accessToken, refrestToken 제거
            navigate("/");
        } catch (error) {
            console.error("Logout Error : ", error);
        }
    }

    useEffect(()=> {
        const fetchData = async() => {
            try {
                // TODO accesstoken 설정
                const jwt_token = localStorage.getItem("jwt_token");
                
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage`, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`,
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
        <>
        <BackButton />
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
                    value={user?.birth_date || '000000'}
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
                    value={user?.bank_code || '숙명은행'}
                    type="text"
                    placeholder="은행"
                    disabled
                />
                <Input 
                    name="account"
                    value={user?.account_number || '000000000000'}
                    type="text"
                    placeholder="계좌번호"
                    disabled
                />
                <Row18>
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
                        onClick={handleLogout}
                    />
                </Row18>
            </Hug18>
        </Wrapper>
        </>
    )
} 