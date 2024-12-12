import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import Header from "../components/headers/Header";
import eximg from "../assets/wishlist/example.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import UserWishItem from "../components/UserWishItem";

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

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
    gap: 40px;
`

// TODO 백 api 명세서 확인 후 재구성
interface WishListData {
    userid: number;
    name: string;
    birth: string;
    dday: number;
    items: Array<{
        item_id: number;
        item_image: string;
        item_name: string;
    }>;
}

export default function UserWishList() {
    const { userId } = useParams<{ userId: string }>();
    const [wishData, setWishData] = useState<WishListData>({
        userid: 1,
        name: "김친구",
        birth: "00월 00일",
        dday: 0,
        items: [
            { item_id: 1, item_image: eximg, item_name: "아이폰1" },
            { item_id: 2, item_image: eximg, item_name: "아이폰2"},
            { item_id: 3, item_image: eximg, item_name: "아이폰3"},
            { item_id: 4, item_image: eximg, item_name: "아이폰4"},
        ],
    });


    // TODO FetchData 주석 제거
    // TODO 생일 당일 처리방법 추가
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
                console.error("Fetching Data Error: ", error);
            }
        };

        // fetchData();
    }, []);

    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth || '00월 00일'} D-{wishData?.dday || '00'}</Subtitle>
                <Header title={`${wishData?.name || '김친구'}님의 위시리스트`} /> 
                <ListWrapper>
                    {/* map 으로 개수만큼 반복 */}
                    {wishData?.items.map((items) => (
                        <UserWishItem
                            key={items.item_id}
                            userid={wishData.userid}
                            item_id={items.item_id}
                            item_image={items.item_image}
                            item_name={items.item_name}
                        />
                    ))}
                </ListWrapper>
            </Wrapper>
        </>
    )
}