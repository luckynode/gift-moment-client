import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import Header from "../components/headers/Header";
import WishItem from "../components/items/WishItem";
import eximg from "../assets/wishlist/example.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import plus from "../assets/wishlist/plus.svg";
import {useNavigate} from "react-router-dom";
import Loading from "../components/loading";
import Button from "../components/buttons/Button";

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

const AddButton = styled.img`
    width: 50px;
    margin-bottom: 60px;
`

const Margin = styled.div`
    margin-bottom: 60px;
`

// TODO 백 api 명세서 확인 후 재구성
interface WishListData {
    name: string;
    birth: string;
    dday: string;
    member_id: number;
    before_birthday: boolean,
    gift: Array<{
        id: number;
        title: string;
        image: string;
        percent: number;
        state: string; // 진행 중, 종료, 완료
    }>;
}

export default function WishList() {
    const navigate = useNavigate();

    // 아이템 클릭 시 상세 페이지로 이동
    const handleItemClick = (itemId: number) => {
        navigate(`/wishlist/item/${itemId}`);
    };

    const handleAddButtonClick = () => {
        navigate("/wishlist/add");
    };
    const [wishData, setWishData] = useState<WishListData>({
        name: "김이름",
        birth: "00월 00일",
        dday: "0",
        member_id: 1,
        before_birthday: true,
        gift: [
            { id: 1, image: eximg, title: "아이폰1", percent: 30, state: "진행 중" },
            { id: 2, image: eximg, title: "아이폰2", percent: 70, state: "종료" },
            { id: 3, image: eximg, title: "아이폰3", percent: 100, state: "완료" },
            { id: 4, image: eximg, title: "아이폰4", percent: 67, state: "진행 중" },
        ],
    });

    const item_num = wishData.gift.length;
    const [loading, setLoading] = useState(true);

    // TODO FetchData 주석 제거
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/member/birthday`,  {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`
                    },
                });
                console.log("WishList Data: ", response.data.data);
                // setWishData(response.data.data);
            } catch (error) {
                console.error("Fetching Data Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if(loading) {
        return <Loading />
    }
    
    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시리스트`} /> 
                <ListWrapper>
                    {/* map 으로 개수만큼 반복 */}
                    {wishData?.gift.map((gift) => (
                        <WishItem
                            key={gift.id}
                            item_id={gift.id}
                            item_image={gift.image}
                            item_name={gift.title}
                            percent={gift.percent}
                            state={gift.state}
                            onClick={() => handleItemClick(gift.id)}
                        />
                    ))}
                </ListWrapper>
                {/* 5개보다 작을 때 추가 버튼 */}
                {/* before birthday true -> addbutton, false -> navigate payment-request */}
                {wishData.before_birthday ? (
                    item_num < 5 && (
                        <AddButton 
                            src={plus}
                            onClick={handleAddButtonClick} 
                        />
                    )
                ) : (
                    <Margin>
                        <Button 
                            text="선물 받으러 가기 →"
                            color="black"
                            size="large"
                            onClick={() => navigate("/payment-request")}
                        />
                    </Margin>
                )}
            </Wrapper>
        </>
    )
}