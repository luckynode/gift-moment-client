import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import BackButton from "../../components/buttons/BackButton";
import eximg from "../../assets/wishlist/example.jpg"
import Header from "../../components/headers/Header";
import Button from "../../components/buttons/Button";
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

const Gap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const Row = styled.form`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin: 30px 0;
`

interface UserWishData {
    name: string;
    birth: string;
    dday: string;
    member_id: number;
    gift: {
        id: number;
        image: string;
        price: number;        
    },
}

interface PriceCheckProps {
    price: string;
}

export default function PriceCheck({price} : PriceCheckProps) {
    const navigate = useNavigate();
    const { itemId } = useParams<{ itemId: string }>();
    const [wishData, setWishData] = useState<UserWishData>({
        name: "김친구",
        birth: "00월 00일",
        dday: "0",
        member_id: 1,
        gift : {
            id: 1,
            image: eximg,
            price: 1000000,
        },
    });

    // 특정 유저 정보 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/${itemId}`,  {});
                const data = response.data.data[0];

                setWishData({
                    name: data.name,
                    birth: data.birth,
                    dday: data.dday,
                    member_id: data.member_id,
                    gift: {
                        id: data.gift.id,
                        image: data.gift.image,
                        price: data.gift.price,
                    },
                });
                
                // userid, item_id, amount 를 local에 저장해서 pay-approve에서 사용
                localStorage.setItem("member_id", data.member_id);
                localStorage.setItem("gift_id", data.gift.id);
                localStorage.setItem("amount", price);
                localStorage.setItem("friend_name", data.name);

            } catch (error) {
                console.error("Fetching data ",error);
            }
        };

        fetchData();
    }, [itemId])

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log(price, itemId);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/payments/kakao-pay`, {
                amount: Number(price),
                gift_id: wishData.gift.id,
            });

            const {tid, next_redirect_pc_url, next_redirect_mobile_url} = response.data.data;

            localStorage.setItem("tid", tid);
            window.location.href = next_redirect_pc_url;
            // window.location.href = next_redirect_mobile_url;
        } catch (error) {
            console.error("금액 전송 오류: ", error);
        }
    }
    
    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`} />
                <Info>
                    <Img src={wishData?.gift.image}/>
                </Info>
                <Gap>
                    <Header title={`${wishData?.name} 님에게 ${Number(price).toLocaleString()}원을`} fontSize="25px"/>
                    <Header title="송금하시겠습니까?" fontSize="25px"/>
                </Gap>
                <Row onSubmit={onSubmit}>
                    <Button size="small" color="black" text="네" onClick={() => {}} type="submit"/>
                    <Button size="small" color="white" text="아니요" onClick={() => {navigate(-1)}}/>
                </Row>
            </Wrapper>
        </>
    )
}