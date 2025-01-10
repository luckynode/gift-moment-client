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

export default function EditMypage() {
    const [userData, setUserData] = useState({
        name: '김눈송',
        birth_date: '2000-01-01',
        email: "email@email.com",
        bank: "숙명은행",
        account: '000000000000',
    })


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
                const {name, birth_date, email, bank, account} = response.data.data; // 데이터 설정
                setUserData({name, birth_date, email, bank, account}); // 수정할 데이터 가져오기
            } catch (error) {
                console.error("Fetchdata error : ", error);
            }
        };
        fetchData();
    }, []);
    const [changedFields, setChangedFields] = useState<{ [key: string]: any }>({});

    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserData(prevState => {
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
            const jwt_token = localStorage.getItem("jwt_token");

            // await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage`,userData, {
            //     headers: {
            //         // Authorization: `Bearer ${jwt_token}`,
                       // 'Content-Type': 'application/json',
            //     },
            // });

            // TEST 콘솔에 데이터 확인
            console.log("수정내용:", updateData);
            alert("정보 수정 완료");
            navigate("/mypage");
            
        } catch (error) {
            console.error("정보 수정 오류", error);
            alert("정보 수정에 실패");
        }
    }

    const handleLeave = async () => {
        try {
            const jwt_token = localStorage.getItem("jwt_token");

            // TODO 탈퇴 안내 모달 등 논의
            
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage/delete`, {
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                }
            });
            navigate("/");
        } catch (error) {
            console.error("Leave Gift-moment Error : ", error);
        }
    }

    return(
        <>
        <BackButton />
        <Wrapper>
            <Title>마이페이지</Title>
            <Form onSubmit={onSubmit}>
                <Hug18>
                    {/* TODO 수정 가능 요소들 확인 후 disabled 예정 */}
                    <Input 
                        name="name"
                        value={userData?.name || '이름'}
                        type="text"
                        placeholder="이름"
                        onChange={onChange}
                    />
                    <Input 
                        name="birth"
                        value={userData?.birth_date || '000000'}
                        type="text"
                        placeholder="생년월일"
                        onChange={onChange}
                    />
                    <Input 
                        name="email"
                        value={userData?.email || 'email@email.com'}
                        type="email"
                        placeholder="이메일"
                        onChange={onChange}
                    />
                    <Input 
                        name="bank"
                        value={userData?.bank || '은행'}
                        type="text"
                        placeholder="은행"
                        disabled
                    />
                    <Input 
                        name="account"
                        value={userData?.account || '계좌번호'}
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