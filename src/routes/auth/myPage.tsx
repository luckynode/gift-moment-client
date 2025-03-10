import { useEffect, useState } from "react";
import { Title, Wrapper, Hug18 } from "../../components/auth/SignupComponents.ts";
import Button from "../../components/buttons/Button.tsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BackButton from "../../components/buttons/BackButton.tsx";
import Loading from "../../components/common/loading.tsx";

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

interface User {
    name: string;
    birth_date: string;
    email: string;
    bank_code: string;
    account_number: number;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식으로 변환
};

export default function Mypage() {
    const [user, setUser] = useState<User | null>(null); // 초기값을 null로 설정
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchData = async() => {
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage`, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`,
                    },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error("Fetchdata error : ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        if (window.confirm("정말 로그아웃하시겠습니까?")) {
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`,
                    },
                });
    
                localStorage.removeItem("jwt_token");
                alert("로그아웃 되었습니다.");
                navigate("/");
            } catch (error) {
                console.error("Logout Error : ", error);
            }   
        }
    }

    if(loading) {
        return <Loading />
    }

    return(
        <>
        <BackButton />
        <Wrapper>
            <Title>마이페이지</Title>
            <Hug18>
                <Input 
                    name="name"
                    value={user?.name}
                    type="text"
                    placeholder="이름"
                    disabled
                />
                <Input 
                    name="birth"
                    value={user?formatDate(user.birth_date) : ''}
                    type="text"
                    placeholder="생년월일"
                    disabled
                />
                <Input 
                    name="email"
                    value={user?.email}
                    type="email"
                    placeholder="이메일"
                    disabled
                />
                <Input 
                    name="bank"
                    value={user?.bank_code}
                    type="text"
                    placeholder="은행"
                    disabled
                />
                <Input 
                    name="account"
                    value={user?.account_number}
                    type="text"
                    placeholder="계좌번호"
                    disabled
                />
                <Row18>
                    <Button 
                        type="button"
                        $text="편집"
                        size="small"
                        color="white"
                        onClick={() => {navigate("/mypage/edit")}}
                    />
                    <Button 
                        type="button"
                        $text="로그아웃"
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