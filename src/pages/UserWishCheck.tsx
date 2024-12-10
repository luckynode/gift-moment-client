import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import Header from "../components/headers/Header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import eximg from "../assets/wishlist/example.jpg"


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
        item_info: "선물 소개란입니다"
    });

    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth || '00월 00일'} D-{wishData?.dday || '00'}</Subtitle>
                <Header title={`${wishData?.name || '김친구'}님의 위시아이템`} />
                <Info>
                    <div>사진</div>
                    <div>이름 가격 링크 소개</div>
                </Info>
                <div>000님에게 선물하시겠어요?</div>
                <div>좋아요 괜찮아요</div>
            </Wrapper>
        </>
    )
}