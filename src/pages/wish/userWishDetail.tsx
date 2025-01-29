import { styled } from "styled-components";
import BackButton from "../../components/buttons/BackButton.tsx";
import Header from "../../components/headers/Header.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import eximg from "../../assets/wishlist/example.jpg"
import { ornamentImages } from '../../assets/letters/ornamentImages.ts';
import Button from "../../components/buttons/Button.tsx";
import axios from "axios";
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

const LinkText = styled.a`
    color: #0066FF;
`;

const CheckBtn = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 40px;
    gap: 20px;
`

const Congrats = styled.div`
    background-color: white;
    min-width: 390px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CongratsTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`

const List = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 363px;
    gap: 15px;
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
    border-radius: 50%;
    width: 50px;
    height: 50px;
`

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
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    color: #000000;
`

// TODO 백 api 명세서 확인 후 재구성
interface UserWishData {
    name: string;
    birth: string;
    dday: string;
    member_id: number;
    gift: {
        id: number;
        title: string;
        image: string;
        price: number;
        link: string;
        description: string;
        payments : Array<{
            name: string;
            percentage: number;
        }>
    },
}

export default function UserWishDetail() {
    const navigate = useNavigate();
    const { itemId } = useParams<{ itemId: string }>();
    const [wishData, setWishData] = useState<UserWishData>({
        member_id: 1,
        name: "김친구",
        birth: "00월 00일",
        dday: "0",
        gift : {
            id: 1,
            title: "아이폰1",
            image: eximg,
            price: 1000000,
            link: "https://www.apple.com/kr/",
            description: "선물 소개란입니다.",
            payments: [
                { name: "친구1", percentage: 20},
                { name: "친구2", percentage: 20},
                { name: "친구3", percentage: 20},
                { name: "친구4", percentage: 20},
            ]
        },
    });
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/${itemId}`,  {});
                setWishData(response.data.data[0]);
            } catch (error) {
                console.error("Fetching data ",error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Loading />
    }

    const onLikeClick = async () => {
        const jwt_token = localStorage.getItem("jwt_token");
        if(!jwt_token) {
            const result = window.confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
            if(result) {
                localStorage.setItem("redirect_url", `${window.location.pathname}/send`);
                navigate(`/login`);
            }
        } else {
            navigate(`send`);
        }
    }

    return (
        <>
            <BackButton />
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`} />
                <Info>
                    <Img src={wishData?.gift.image}/>
                    <Input>{wishData?.gift.title}</Input>
                    <Input>{wishData?.gift.price.toLocaleString()} 원</Input>
                    <Input>
                        <LinkText href={wishData?.gift.link}>
                            {wishData?.gift.link}
                        </LinkText>
                    </Input>
                    <Input>{wishData?.gift.description}</Input>
                </Info>
                <Header title={`${wishData?.name} 님에게 선물하기`} fontSize="25px"/>
                <CheckBtn>
                    {/* 로그인 여부 확인 */}
                    <Button text="좋아요!" size="small" color="black" onClick={() => {onLikeClick()}}/>
                    <Button text="괜찮아요" size="small" color="white" onClick={() => {navigate(-1)}}/>
                </CheckBtn>
                <Congrats>
                    <CongratsTitle>축하해준 친구들</CongratsTitle>
                    <List>
                        {/* map으로 개수만큼 반복 */}
                        {wishData?.gift.payments.map((friend, index) => (
                            <Card key={friend.name}>
                                <CardImg src={ornamentImages[index % ornamentImages.length]} />
                                <CardName>
                                    <FriendName>{friend.name}</FriendName>
                                    <FreindPercent>{friend.percentage}%</FreindPercent>
                                </CardName>
                            </Card>
                        ))}
                    </List>
                </Congrats>
            </Wrapper>
        </>
    )
}