import { styled } from "styled-components";
import BackButton from "../components/buttons/BackButton";
import Header from "../components/headers/Header";
import WishItem from "../components/WishItem";
import eximg from "../assets/wishlist/example.jpg"
import { useEffect, useState } from "react";
import axios from "axios";
import plus from "../assets/wishlist/plus.svg";
import {useNavigate} from "react-router-dom";

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

// TODO 백 api 명세서 확인 후 재구성
interface WishListData {
    name: string;
    birth: string;
    dday: number;
    item_num: number;
    items: Array<{
        item_id: number;
        item_image: string;
        item_name: string;
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
        dday: 0,
        item_num: 5,
        items: [
            { item_id: 1, item_image: eximg, item_name: "아이폰1", percent: 30, state: "진행 중" },
            { item_id: 2, item_image: eximg, item_name: "아이폰2", percent: 70, state: "종료" },
            { item_id: 3, item_image: eximg, item_name: "아이폰3", percent: 100, state: "완료" },
            { item_id: 4, item_image: eximg, item_name: "아이폰4", percent: 67, state: "진행 중" },
            { item_id: 5, item_image: eximg, item_name: "아이폰5", percent: 45, state: "종료" },
        ],
    });


    // TODO FetchData 주석 제거
    // TODO 생일 당일 처리방법 추가
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist`,  {
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
                <Header title={`${wishData?.name || '김이름'}님의 위시리스트`} /> 
                <ListWrapper>
                    {/* map 으로 개수만큼 반복 */}
                    {wishData?.items.map((items) => (
                        <WishItem
                            key={items.item_id}
                            item_id={items.item_id}
                            item_image={items.item_image}
                            item_name={items.item_name}
                            percent={items.percent}
                            state={items.state}
                            onClick={() => handleItemClick(items.item_id)}
                        />
                    ))}
                </ListWrapper>
                {/* 5개보다 작을 때 추가 버튼 */}
                {wishData?.item_num < 5 && (
                    <AddButton 
                        src={plus}
                        onClick={handleAddButtonClick} 
                    />
                )}
            </Wrapper>
        </>
    )
}