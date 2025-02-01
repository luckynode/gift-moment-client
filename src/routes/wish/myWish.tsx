import { useEffect, useState } from "react";
import { Hug18, Title, Wrapper } from "../../components/auth/SignupComponents.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button.tsx";
import mascot from "../../assets/home/mascot.svg";
import styled from "styled-components";
import Loading from "../../components/common/loading.tsx";

const Mascot = styled.img`
  width: 45%;
`;

export default function Mywish() {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isBirthday, setIsBirthday] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/member/birthday`,  {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`
                    },
                });
                setName(response.data.data[0].name);
                setBirthday(response.data.data[0].birth);
                setIsBirthday(response.data.data[0].before_birthday);    
            } catch (error) {
                console.error("Fetching Data Error: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) {
        return <Loading />
    }

    const buttons = [
        { text: "편지함 보러 가기", size: "large" as 'large', onClick: () => navigate("/my-letters") },
        { text: "위시리스트 보러 가기", size: "large" as 'large', onClick: () => navigate("/wishlist") },
    ];

    // 생일 여부에 따른 조건부 렌더링
    if (!isBirthday) {
        return (
            <Wrapper>
                <Mascot src={mascot} />
                <Title>{name || "김이름"}님!</Title>
                <Title>{birthday || "00월 00일"} 생일을</Title>
                <Title>진심으로 축하드립니다 ♥</Title>
                <Hug18>
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            type="button"
                            $text={button.text}
                            size={button.size}
                            onClick={button.onClick}
                        />
                    ))}
                </Hug18>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Title>{name || "name"}님의 위시리스트</Title>
            <Title>확인하러 가볼까요?</Title>
            <Hug18>
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        type="button"
                        $text={button.text}
                        size={button.size}
                        onClick={button.onClick}
                    />
                ))}
            </Hug18>
        </Wrapper>
    );
}