import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import Header from "../components/headers/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import eximg from "../assets/wishlist/example.jpg"
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

const Input = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: 330px;
    min-height: 50px;
    box-sizing: border-box;
    padding: 10px;

    font-size: 20px;
    font-family: 'Lato';
    font-weight: 500;

    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 8px;
`

const LinkText = styled.a`
    color: #0066FF;
`;

const CheckBtn = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 40px;
    gap: 20px;
`

// TODO 백 api 명세서 확인 후 재구성
interface UserWishData {
    userid: number;
    name: string;
    birth: string;
    dday: number;
    item_id: number;
    item_image: string;
    item_name: string;
    item_price: number;
    item_link: string;
    item_info: string;
}

export default function UserWishCheck() {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [wishData, setWishData] = useState<UserWishData>({
        userid: 1,
        name: "김친구",
        birth: "00월 00일",
        dday: 0,
        item_id: 1,
        item_image: eximg,
        item_name: "아이폰1",
        item_price: 1000000,
        item_link: "https://www.apple.com/kr/",
        item_info: "선물 소개란입니다."
    });

    // TODO FetchData 주석 제거 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${userId}`,  {
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
                    <Input>{wishData?.item_name}</Input>
                    <Input>{wishData?.item_price} 원</Input>
                    <Input>
                        <LinkText href={wishData?.item_link}>
                            {wishData?.item_link}
                        </LinkText>
                    </Input>
                    <Input>{wishData?.item_info}</Input>
                </Info>
                <Header title={`${wishData?.name} 님에게 선물하기`} fontSize="25px"/>
                <CheckBtn>
                    <Button text="좋아요!" size="small" color="black" onClick={() => {navigate("send")}}/>
                    <Button text="괜찮아요" size="small" color="white" onClick={() => {}}/>
                </CheckBtn>
            </Wrapper>
        </>
    )
}