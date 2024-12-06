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


// TODO data type 확인

export default function EditMypage() {
    const [userData, setUserData] = useState({
        name: '김눈송',
        birth: '000000',
        email: "email@email.com",
        bank: "숙명은행",
        account: '000000000000',
    })


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
                const {name, birth, email, bank, account} = response.data.data; // 데이터 설정
                setUserData({name, birth, email, bank, account}); // 수정할 데이터 가져오기
            } catch (error) {
                console.error("Fetchdata error : ", error);
            }
        };
        fetchData();
    }, []);

    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const { target : {name, value}} = e;

        setUserData(prevState => ({
            ...prevState, // 이전 상태를 복사
            [name]: value, // 변경된 필드 업데이트
        }));    }
    

    const onSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // TODO accesstoken 설정

            // await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/mypage`,userData, {
            //     headers: {
            //         // Authorization: `Bearer ${accessToken}`,
            //     },
            // });

            // TEST 콘솔에 데이터 확인
            console.log(userData);
            alert("정보 수정 완료");
            navigate("/mypage");
            
        } catch (error) {
            console.error("정보 수정 오류", error);
            alert("정보 수정에 실패");
        }
    }

    const handleLeave = async () => {
        try {
            // TODO accesstoken 설정
            // TODO 탈퇴 안내 모달 등 논의
            
            await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/auth/leave`, {
                headers: {
                    // Authorization: `Bearer ${accessToken}`,
                }
            });
            navigate("/");
        } catch (error) {
            console.error("Leave Gift-moment Error : ", error);
        }
    }

    return(
        <div>
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
                        value={userData?.birth || '000000'}
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
                        onChange={onChange}
                    />
                    <Input 
                        name="account"
                        value={userData?.account || '계좌번호'}
                        type="text"
                        placeholder="계좌번호"
                        onChange={onChange}
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
        </div>
    )
} 