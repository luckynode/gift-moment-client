import { styled } from "styled-components";
import BackButton from "../../components/buttons/BackButton.tsx";
import Header from "../../components/headers/Header.tsx";
import WishItem from "../../components/items/WishItem.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import plus from "../../assets/wishlist/plus.svg";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/common/loading.tsx";
import Button from "../../components/buttons/Button.tsx";

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

interface AccountInfo {
    bank_code: string;
    account_number: string;
}

export default function WishList() {
    const navigate = useNavigate();

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
        gift: [],
    });

    const item_num = wishData.gift.length;
    const [loading, setLoading] = useState(true);
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt_token = localStorage.getItem("jwt_token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/member/birthday`,  {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`
                    },
                });
                console.log(response.data.data[0]);
                setWishData(response.data.data[0]);

                const accountResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/mypage`, {
                    headers: {
                        Authorization: `Bearer ${jwt_token}`
                    },
                });
                console.log(accountResponse.data.data);
                setAccountInfo({
                    bank_code: accountResponse.data.data.bank_code,
                    account_number: accountResponse.data.data.account_number,
                });

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
                            onClick={() => navigate("/payment-request", {state: {accountInfo}})}
                        />
                    </Margin>
                )}
            </Wrapper>
        </>
    )
}