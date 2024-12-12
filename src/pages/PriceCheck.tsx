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

// TODO 백엔드에서 받아올 데이터 형식에 맞게 수정
interface UserWishData {
    userid: number;
    name: string;
    birth: string;
    dday: number;
    item_id: number;
    item_image: string;
}

interface PriceCheckProps {
    price: string;
}

export default function PriceCheck({price} : PriceCheckProps) {
    const navigate = useNavigate();
    const { userId, itemId } = useParams<{ userId: string, itemId: string }>();
    const [wishData, setWishData] = useState<UserWishData>({
        userid: 1,
        name: "김친구",
        birth: "00월 00일",
        dday: 0,
        item_id: 1,
        item_image: eximg,
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

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // 테스트로 console 출력
            console.log("가격: ", price);

            // TODO 서버 axios post.
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${userId}/item/${itemId}/send`,
                    { price: price },
                )

                // TODO 실제 결제 페이지 이동

                console.log("금액 전송 : ", price);
            } catch (error) {
                console.error("금액 전송 오류: ", error);
            }
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
                    <Img src={wishData?.item_image}/>
                </Info>
                <Gap>
                    <Header title={`${wishData?.name} 님에게 ${price}원을`} fontSize="25px"/>
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