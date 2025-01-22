import {useEffect} from "react";
import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import eximg from "../assets/wishlist/example.jpg";
import Button from "../components/buttons/Button.tsx";
import {ornamentImages} from '../assets/ornamentImages.ts';
import {getWishItem} from '../apis/wishItemApi.ts';
import {GetWishResponse} from "../types/api/wishItem.ts";

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 363px;
  gap: 15px;
`
export const WishInput = styled.div`
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

const Card = styled.div`
  width: 111px;
  height: 50px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 5px;
`

const CardImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #C8C8C8;
  object-fit: contain;
  padding: 5px;
`;

const CardName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`

const FriendName = styled.div`
  font-family: 'Lato';
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: #000000;
`

const FreindPercent = styled.div`
  font-family: 'Lato';
  font-weight: 500;
  font-size: 12px;
  color: #000000;
`

const Congrats = styled.div`
  background-color: white;
  min-width: 390px;
  padding: 10px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CongratsTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
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

const LinkText = styled.a`
  color: #0066FF;
`;

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

const MyWishDetail = () => {
    const navigate = useNavigate();
    const {itemId} = useParams<{ itemId: string }>();

    const [wishData, setWishData] = useState<GetWishResponse | null>(null);

    // 데이터 가져오기
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
            <Wrapper>
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
                    navigate(`/wishlist/item/${itemId}/modify`)
                }}/>
                <Congrats>
                    <CongratsTitle>축하해준 친구들</CongratsTitle>
                    <List>
                        {wishData?.gift?.payments.map((payment, index) => (
                            <Card key={payment.name}>
                                <CardImg src={ornamentImages[index % ornamentImages.length]}/>
                                <CardName>
                                    <FriendName>{payment.name}</FriendName>
                                    <FreindPercent>{payment.amount ? Number(payment.amount).toLocaleString() : "0"}원</FreindPercent> {/* 3자리마다 콤마 추가 */}
                                </CardName>
                            </Card>
                        ))}
                    </List>
                </Congrats>
            </Wrapper>
        </>
    )
}

export default MyWishDetail;