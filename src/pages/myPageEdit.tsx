import { useEffect, useState } from "react";
import { Title, Wrapper, Input, Hug18, Form } from "../components/SignupComponents";
import Button from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BackButton from "../components/buttons/BackButton";

const Leave = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;

    color: #B6001E;
    cursor: pointer;
    text-align: center;

    font-size: 18px;
    text-decoration: underline;
`
interface ChangedFields {
    [key: string]: string | undefined;
}

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

export default function EditMypage() {
    const [user, setUser] = useState<User>({
        name: '',
        birth_date: '2001-01-01',
        email: "",
        bank_code: "",
        account_number: 0,
    });


    const navigate = useNavigate();

    useEffect(()=> {
        const fetchData = async() => {
            try {
                const jwt_token = localStorage.getItem("jwt_token");

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage`, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`,
                    },
                });
                const {name, birth_date, email, bank_code, account_number} = response.data.data;
                setUser({name, birth_date, email, bank_code, account_number});
            } catch (error) {
                console.error("Fetchdata error : ", error);
            }
        };
        fetchData();
    }, []);

    const [changedFields, setChangedFields] = useState<{ [key: string]: any }>({});

    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser(prevState => {
            const updatedData = {...prevState, [name]: value};

            // 변경 필드 추적
            setChangedFields(prevFields => ({
                ...prevFields,
                [name]: value,
            }));

            return updatedData;
        });
    }
    

    const onSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updateData: ChangedFields = {};

        // 변경된 필드 추가
        for (const key in changedFields) {
            if(changedFields[key]){
                updateData[key] = changedFields[key];
            }
        }

        try {
            // TODO 주석제거
            console.log("수정내용:", updateData);
            const jwt_token = localStorage.getItem("jwt_token");

            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage`,updateData, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json',
                },
            });

            alert("정보 수정 완료");
            navigate("/mypage");
            
        } catch (error) {
            console.error("정보 수정 오류", error);
            alert("정보 수정에 실패");
        }
    }

    const handleLeave = async () => {
        const message = window.confirm("Gift-moment 서비스를 탈퇴하시겠습니까?");

        if(message){
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                    
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage/delete`, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`,
                    }
                });
                localStorage.removeItem("jwt_token");
                navigate("/");
            } catch (error) {
                console.error("Leave Gift-moment Error : ", error);
            }
        }
    }

    return(
        <>
        <BackButton />
        <Wrapper>
            <Title>마이페이지</Title>
            <Form onSubmit={onSubmit}>
                <Hug18>
                    <Input 
                        name="name"
                        value={user?.name}
                        type="text"
                        placeholder="이름"
                        onChange={onChange}
                    />
                    <Input 
                        name="birth_date"
                        value={user?formatDate(user.birth_date) : ''}
                        type="date"
                        placeholder="생년월일"
                        onChange={onChange}
                    />
                    <Input 
                        name="email"
                        value={user?.email}
                        type="email"
                        placeholder="이메일"
                        onChange={onChange}
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
                    <Button 
                        type="submit"
                        text="완료"
                        size="small"
                        color="black"
                        onClick={() => {}}
                    />
                </Hug18>
            </Form>
        </Wrapper>
        <Leave onClick={handleLeave}> 탈퇴 </Leave>
        </>
    )
} 