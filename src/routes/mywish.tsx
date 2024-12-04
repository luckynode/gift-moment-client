import { useEffect, useState } from "react";
import { Hug18, Submit250, Title, Wrapper } from "../components/SignupComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mywish() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchData = async() => {
            try {
                // TODO accessToken 가져오기, url 재확인

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mywish`, {
                    headers: {
                        // Authorization: `Bearer ${accessToken}`
                    },
                });
                setName(response.data.data);
            } catch (error) {
                console.error("Fetch data error : ", error);
            }
        };
        fetchData();
    }, []);

    return(
        <Wrapper>
            <Title>{name || "name"}님의 위시리스트</Title>
            <Title>확인하러 가볼까요?</Title>
            <Hug18>
                <Submit250
                    type="button"
                    value="편지함 보러가기"
                    onClick={() => navigate("/my-letters")}
                />
                <Submit250
                    type="button"
                    value="위시리스트 보러가기"
                    onClick={() => navigate("/signup")}
                />
            </Hug18>
        </Wrapper>
    )
}