import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import eximg from "../assets/wishlist/example.jpg"
import Header from "../components/headers/Header";
import Button from "../components/buttons/Button";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 수직가운데 */
    justify-content: flex-start;
    padding-top: 70px;
`

const Subtitle = styled.div`
    font-size: 25px;
    font-family: 'Lato';
    color: transparent;
    display: inline-block;
    background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); /* 중앙만 살짝 연하게 */
    background-clip: text;
`

const Info = styled.div`
    gap: 20px;
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Img = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;

    background: #F8A0BD;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`

const Input = styled.input`
    display: flex;
    align-items: flex-start;
    justify-content: center;

    width: 330px;
    min-height: 50px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 40px;

    font-size: 20px;
    font-family: 'Lato';
    font-weight: 500;

    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 8px;
`

// TODO 백엔드에서 받아올 데이터 형식에 맞게 수정
interface UserWishData {
    userid: number;
    name: string;
    birth: string;
    dday: number;
    item_id: number;
    item_image: string;
    item_name: string;
}

export default function GiftAmount() {
    const navigate = useNavigate();
    const { userId, itemId } = useParams<{ userId: string, itemId: string }>();

    const [wishData, setWishData] = useState<UserWishData>({
        userid: 1,
        name: "김친구",
        birth: "00월 00일",
        dday: 0,
        item_id: 1,
        item_image: eximg,
        item_name: "아이폰1",
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
    })
    
    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`} />
                <Info>
                    <Img src={wishData?.item_image}/>
                </Info>
                <Header title="얼마를 송금하시겠어요?" fontSize="25px"/>
                <Input placeholder="금액" type="number"/>
                <Button size="small" color="black" text="완료" onClick={() => {}}/>
            </Wrapper>
        </>
    )
}