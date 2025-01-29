import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import BackButton from "../../components/buttons/BackButton";
import eximg from "../../assets/wishlist/example.jpg"
import Header from "../../components/headers/Header";
import Button from "../../components/buttons/Button";
import axios from "axios";

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && !['isError', 'isOverError'].includes(prop),
  })<TextProps>`
    display: flex;
    align-items: flex-start;
    justify-content: center;

    width: 330px;
    min-height: 50px;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;

    font-size: 20px;
    font-family: 'Lato';
    font-weight: 500;

    background: #FFFFFF;
    border: 1px solid ${({ isError, isOverError }) => ( isError || isOverError ) ? 'red' : '#C8C8C8'};
    border-radius: 8px;
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

interface TextProps {
    isError?: boolean; // 0원 이하
    isOverError?: boolean; // 최대 금액 초과
}

interface UserWishData {
    name: string;
    birth: string;
    dday: string;
    member_id: number;
    gift: {
        id: number;
        image: string;
        price: number;        
    },
}

interface GetInfoProps {
    onNext: (price: number) => void; // onNext 함수 타입 정의
}

export default function InputPrice({ onNext } : GetInfoProps) {
    const { itemId } = useParams<{ itemId: string }>();
    const [wishData, setWishData] = useState<UserWishData>({
        name: "김친구",
        birth: "00월 00일",
        dday: "0",
        member_id: 1,
        gift : {
            id: 1,
            image: eximg,
            price: 1000000,
        },
    });

    const [price, setPrice] = useState<number>(0);
    const [isError, setIsError] = useState(false);
    const [isOverError, setIsOverError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/wishlists/${itemId}`,  {});
                const data = response.data.data[0];
                setWishData({
                    name: data.name,
                    birth: data.birth,
                    dday: data.dday,
                    member_id: data.member_id,
                    gift: {
                        id: data.gift.id,
                        image: data.gift.image,
                        price: data.gift.price,
                    },
                });
            } catch (error) {
                console.error("Fetching data ",error);
            }
        };

        fetchData();
    }, [itemId])


    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setPrice(value);

        // 가격이 0 이하일 경우 에러 상태 설정
        if (value <= 0) {
            setIsError(true);
        } 
        else if (value > wishData.gift.price){
            setIsOverError(true);
        } 
        else {
            setIsError(false); // 유효한 값일 경우 에러 해제
            setIsOverError(false);
        }
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (price <= 0) {
            setIsError(true);
            return;
        }

        if (price > wishData.gift.price){
            setIsOverError(true);
            return;
        }

        try {
            // 다음 페이지로 정보 넘기기
            onNext(price);
        } catch (error) {
            console.error("금액 전송 오류: ", error);
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
                </Info>
                <Header title="얼마를 송금하시겠어요?" fontSize="25px"/>
                <Form onSubmit={onSubmit}>
                    <Input onChange={onChange} placeholder="금액" name="price" value={price} type="number" required isError={isError} isOverError={isOverError}/>
                    {isError && <ErrorMessage>금액을 입력해주세요.</ErrorMessage>}
                    {isOverError && <ErrorMessage>선물 가격을 초과했습니다.</ErrorMessage>}
                    <Button type="submit" size="small" color="black" text="완료" onClick={() => {}}/>
                </Form>
            </Wrapper>
        </>
    )
}