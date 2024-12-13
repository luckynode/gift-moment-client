import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import {Wrapper} from "../components/SignupComponents.ts";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import eximg from "../assets/wishlist/example.jpg";
import Button from "../components/buttons/Button.tsx";
import { ornamentImages } from '../assets/ornamentImages';

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 363px;
  gap: 15px;
`
const Input = styled.div`
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
  font-family: 'Lato',serif;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: #000000;
`

const FreindPercent = styled.div`
  font-family: 'Lato',serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
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

// TODO 추후 api명세서에 따라 수정
interface MyWishDetailData {
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
    Friends: Array<{
        friend_profile: string;
        friend_name: string;
        friend_price: number;
    }>
}

const MyWishDetail = () => {
    const navigate = useNavigate();
    const {itemId} = useParams<{ itemId: string }>();
    const [wishData, setWishData] = useState<MyWishDetailData>({
        userid: 1,
        name: "김유저",
        birth: "00월 00일",
        dday: 0,
        item_id: 1,
        item_image: eximg,
        item_name: "아이폰1",
        item_price: 1000000,
        item_link: "https://www.apple.com/kr/",
        item_info: "선물 소개란입니다.",
        Friends: [
            {friend_profile: "", friend_name: "친구1", friend_price: 220000},
            {friend_profile: "", friend_name: "친구2", friend_price: 50000},
            {friend_profile: "", friend_name: "친구3", friend_price: 55000},
            {friend_profile: "", friend_name: "친구4", friend_price: 50000},
            {friend_profile: "", friend_name: "친구5", friend_price: 70000},
        ]
    });

    return (
        <>
            <BackButton/>
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`}/>
                <Info>
                    <Img src={wishData?.item_image}/>
                    <Input>{wishData?.item_name}</Input>
                    <Input>{wishData?.item_price} 원</Input>
                    <Input>
                        <LinkText href={wishData?.item_link}>
                            {wishData?.item_link}
                        </LinkText>
                    </Input>
                    <Input>{wishData?.item_info}</Input>
                </Info>
                <Button text="편집" size="small" color="white" onClick={() => {navigate(-1)}}/>
                <Congrats>
                    <CongratsTitle>축하해준 친구들</CongratsTitle>
                    <List>
                        {/* map으로 개수만큼 반복 */}
                        {wishData?.Friends.map((friend, index) => (
                            <Card key={friend.friend_name}>
                                <CardImg src={ornamentImages[index % ornamentImages.length]} />
                                <CardName>
                                    <FriendName>{friend.friend_name}</FriendName>
                                    <FreindPercent>{friend.friend_price.toLocaleString()}원</FreindPercent> {/* 3자리마다 콤마 추가 */}
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