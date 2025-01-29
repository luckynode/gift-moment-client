import {useEffect} from "react";
import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import Button from "../components/buttons/Button.tsx";
import {getWishItem} from '../apis/wishItemApi.ts';
import {GetWishResponse} from "../types/api/wishItem.ts";
import {Subtitle, WishWrapper} from "../components/wish/Wish.ts";
import {Info, WishInput} from "../components/wish/WishInput.ts";
import CongratsList from "../components/wish/CongratsList.tsx";

const Img = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;

  background: #F8A0BD;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`

const LinkText = styled.a`
  color: #0066FF;
`;

const MyWishDetail = () => {
    const navigate = useNavigate();
    const {itemId} = useParams<{ itemId: string }>();

    const [wishData, setWishData] = useState<GetWishResponse[0] | null>(null);

    useEffect(() => {
        if (!itemId) {
            console.error("itemId가 없습니다.");
            return;
        }

        const fetchWishItem = async () => {
            if (!itemId) return;
            try {
                const response = await getWishItem(Number(itemId));
                if (response.status === 'success') {
                    // console.log("위시아이템 응답 데이터:", response.data[0]);
                    setWishData(response.data[0]);
                } else {
                    console.error("API 응답 에러:", response.message);
                }
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        fetchWishItem();
    }, [itemId]);

    useEffect(() => {
        console.log("wishData 상태 변경됨:", wishData);
    }, [wishData]);

    return (
        <>
            <BackButton/>
            <WishWrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`}/>
                <Info>
                    <Img src={wishData?.gift?.image}/>
                    <WishInput>{wishData?.gift?.title}</WishInput>
                    <WishInput>{wishData?.gift?.price ? Number(wishData.gift.price).toLocaleString() : "0"}원</WishInput>
                    <WishInput>
                        <LinkText href={wishData?.gift?.link}>
                            {wishData?.gift?.link}
                        </LinkText>
                    </WishInput>
                    <WishInput>{wishData?.gift?.description}</WishInput>
                </Info>
                <Button type="button" text="편집" size="small" color="white" onClick={() => {
                    navigate(`/wishlist/item/${itemId}/modify`, {state: {wishData}})
                }}/>
                {wishData?.gift?.payments && (
                    <CongratsList payments={wishData.gift.payments} />
                )}
            </WishWrapper>
        </>
    )
}

export default MyWishDetail;