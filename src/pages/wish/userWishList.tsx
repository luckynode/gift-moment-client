import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import BackButton from "../../components/buttons/BackButton.tsx";
import Header from "../../components/headers/Header.tsx";
import eximg from "../../assets/wishlist/example.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import UserWishItem from "../../components/items/UserWishItem.tsx";
import Loading from "../../components/common/loading.tsx";

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

interface WishListData {
    name: string;
    birth: string;
    dday: string;
    gift: Array<{
        id: number;
        image: string;
        title: string;
    }>;
}

export default function UserWishList() {
    const { uniqueString } = useParams<{ uniqueString: string }>();
    const [wishData, setWishData] = useState<WishListData>({
        name: "김친구",
        birth: "00월 00일",
        dday: "0",
        gift: [
            { id: 1, image: eximg, title: "아이폰1" },
            { id: 2, image: eximg, title: "아이폰2"},
            { id: 3, image: eximg, title: "아이폰3"},
            { id: 4, image: eximg, title: "아이폰4"},
        ],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('uniqueString', String(uniqueString));
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/giver/bylink`, {
                    params: {
                        letter_link: uniqueString, // 쿼리 파라미터로 추가
                    },
                });
                setWishData(response.data.data);
            } catch (error) {
                console.error("Fetching Data Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday }</Subtitle>
                <Header title={`${wishData?.name}님의 위시리스트`} /> 
                <ListWrapper>
                    {/* map 으로 개수만큼 반복 */}
                    {wishData?.gift.map((gift) => (
                        <UserWishItem
                            key={gift.id}
                            uniqueString={String(uniqueString)}
                            item_id={gift.id}
                            item_image={gift.image}
                            item_name={gift.title}
                        />
                    ))}
                </ListWrapper>
            </Wrapper>
        </>
    )
}