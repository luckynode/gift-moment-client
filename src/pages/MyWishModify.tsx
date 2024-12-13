import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import {Input, Wrapper} from "../components/SignupComponents.ts";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import eximg from "../assets/wishlist/example.jpg";
import Button from "../components/buttons/Button.tsx";
import {RowButtonContainer} from "../routes/LetterSentConfirm.tsx";
import {WishInput} from "./MyWishDetail.tsx";

const WishDisabledInput = styled(WishInput)`
  background: #EEE2E2;
`;

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직가운데 */
  justify-content: flex-start;
  padding-top: 70px;
  padding-bottom: 70px;
`

const Subtitle = styled.div`
  font-size: 25px;
  font-family: 'Lato';
  color: transparent;
  display: inline-block;
  background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); /* 중앙만 살짝 연하게 */
  background-clip: text;
`

export const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 330px;
  height: 150px;
  font-size: 20px;
  resize: none;
  background: #FFFFFF;
  border: 1px solid #C8C8C8;
  border-radius: 8px;
  padding: 15px;

  &:disabled {
    background-color: #FFFFFF90;
  }
`;


const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-left: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  width: 100%;
  gap: 5px; /* 입력 필드와 오류 메시지 간격 */
`;

const CustomInput = styled(Input)`
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
`;

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

const MyWishModify = () => {
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

    const [wishLink, setWishLink] = useState(wishData.item_link);
    const [wishDescription, setWishDescription] = useState(wishData.item_info);

    const [wishLinkError, setWishLinkError] = useState(false);
    const [wishDescriptionError, setWishDescriptionError] = useState(false);

    const handleFocus = (setter: (value: boolean) => void) => {
        setter(false); // 에러 상태 초기화
    };


    const handleInputChange = (
        setter: (value: string) => void,
        value: string,
        maxLength: number,
        validator?: (value: string) => boolean,
        errorSetter?: (value: boolean) => void
    ) => {
        // 최대 길이를 넘어가지 않을 경우
        if (value.length <= maxLength) {
            // validator가 있고, 값이 유효하지 않을 경우
            if (validator && !validator(value)) {
                errorSetter && errorSetter(true); // 에러 상태 설정
                return;
            }

            setter(value); // 값 업데이트
            errorSetter && errorSetter(false); // 에러 초기화
        }
    };

    const handleDelete = async () => {
        try {
            // TODO 삭제 axios 요청
            // 삭제 후 목록 페이지로 리디렉션
            navigate("/wishlist");
        } catch (error) {
            console.error("삭제 오류: ", error);
        }
    };

    // FIXME AddWish.tsx와 공통된 부분 함수로 묶어서 사용하기
    // FIXME input값 하나 업데이트인데, 코드가 너무 복잡해짐
    const handleComplete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 순차적으로 에러를 처리

        if (!wishLink.trim()) {
            setWishLinkError(true);
            return;
        } else {
            setWishLinkError(false);
        }

        if (!wishDescription.trim()) {
            setWishDescriptionError(true);
            return;
        } else {
            setWishDescriptionError(false);
        }
        try {
            // TODO 수정 axios 요청
            // 수정 완료 후 상세 페이지로 리디렉션
            console.log("수정된 데이터는??:", {wishLink, wishDescription});
            navigate(`/wishlist/item/${itemId}`);
        } catch (error) {
            console.error("수정 오류: ", error);
        }
    };

    return (
        <>
            <BackButton/>
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`}/>
                <Info>
                    {/* 선물 사진은 수정 가능 */}
                    <Img src={wishData?.item_image}/>

                    {/* 선물명과 가격은 수정 못함 */}
                    <WishDisabledInput>{wishData?.item_name}</WishDisabledInput>
                    <WishDisabledInput>{wishData?.item_price} 원</WishDisabledInput>
                    {/* 선물 링크와 선물 설명은 수정 가능 */}
                    <InputContainer>
                        <CustomInput
                            name="wishLink"
                            value={wishLink}
                            type="text"
                            placeholder="선물 링크"
                            error={wishLinkError} // 에러 상태 전달
                            onFocus={() => handleFocus(setWishLinkError)} // 에러 초기화
                            onChange={(e) => setWishLink(e.target.value)} // 상태 업데이트
                        />
                        {wishLinkError && <ErrorMessage>구매하려는 선물 링크를 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <TextArea
                            name="wishDescription"
                            value={wishDescription}
                            type="text"
                            placeholder="선물 소개"
                            error={wishDescriptionError} // error 상태 전달
                            onFocus={() => handleFocus(setWishDescriptionError)} // focus 시 에러 초기화
                            onChange={(e) => handleInputChange(setWishDescription, e.target.value, 100)}
                        />
                        {wishDescriptionError && <ErrorMessage>선물에 대해 간략히 설명해주세요️!</ErrorMessage>}
                    </InputContainer>
                </Info>
                <RowButtonContainer>
                    <Button type="button" text="삭제" size="small" color="white" onClick={handleDelete}/>
                    <Button type="button" text="완료" size="small" color="black" onClick={handleComplete}/>
                </RowButtonContainer>
            </Wrapper>
        </>
    )
}

export default MyWishModify;