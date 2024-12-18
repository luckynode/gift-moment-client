import Header from "../components/headers/Header.tsx";
import Button from "../components/buttons/Button.tsx";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import mascot from "../assets/home/mascot.svg"
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`

const RowButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Mascot = styled.img`
  width: 45%;
`

// TODO 백엔드에서 받아올 데이터 형식에 맞게 수정
interface UserWishData {
    userid: number;
    name: string;
    item_id: number;
}

export default function SendConfirm() {
    const navigate = useNavigate();
    const { userId, itemId } = useParams<{ userId: string, itemId: string }>();
    const [wishData, setWishData] = useState<UserWishData>({
        userid: 1,
        name: "김친구",
        item_id: 1,
    });

    // TODO FetchData 주석 제거 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${userId}/item/${itemId}/send`,  {
                    headers: {
                        // Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 포함
                    },
                });
                setWishData(response.data.data);
            } catch (error) {
                console.error("Fetching data ",error);
            }
        };

        // fetchData();
    }, []);

    return (
        <>
        <Wrapper>
            <Mascot src={mascot}></Mascot>
            <Header title={`${wishData.name} 님에게 선물이 전달되었어요!`} fontSize={"25px"}/>
            <RowButtonContainer>
                <Button type="button" text="확인" size="small" color="black" onClick={() => {
                    navigate("/wishlist/:userId")
                }}/>
            </RowButtonContainer>
        </Wrapper>
        </>
    )
}