import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import {Form, Hug18, Input} from "../components/SignupComponents.ts";
import {useState} from "react";
import styled from "styled-components";
import Button from "../components/buttons/Button.tsx";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 70px;
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

const CustomInput = styled(Input)`
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
`;

const PriceInput = styled(Input)`
  padding-right: 50px;
  text-align: right; /* 선물 가격만 오른쪽 정렬하기 */

  &::placeholder {
    text-align: left; /* placeholder는 그대로 왼쪽 정렬 */
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

const CurrencyLabel = styled.span`
  position: absolute;
  right: 20px;
  color: black;
  font-size: 20px;
  font-weight: 700; /* bold */
`;

const PriceInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const AddWish = () => {

    const [wishName, setWishName] = useState("");
    const [wishPrice, setWishPrice] = useState("");
    const [wishLink, setWishLink] = useState("");
    const [wishDescription, setWishDescription] = useState("");
    const navigate = useNavigate();

    const [wishNameError, setWishNameError] = useState(false);
    const [wishPriceError, setWishPriceError] = useState(false);
    const [wishLinkError, setWishLinkError] = useState(false);
    const [wishDescriptionError, setWishDescriptionError] = useState(false);

    const handleFocus = (setter: (value: boolean) => void) => {
        setter(false); // 에러 상태 초기화
    };

    // 가격 입력 시 숫자만 입력하도록 처리
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // 숫자와 콤마만 남기기
        const numericValue = value.replace(/[^0-9]/g, "");

        if (numericValue !== value.replace(/,/g, "")) { // 콤마는 허용해주기
            // 숫자 외의 문자가 입력된 경우 에러 처리
            setWishPriceError(true);
        } else {
            // 유효한 입력이면 에러 해제
            setWishPriceError(false);
        }

        // 3개 숫자 간격으로 콤마 추가
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setWishPrice(formattedValue);
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


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 순차적으로 에러를 처리
        if (!wishName) {
            setWishNameError(true);
            return;
        } else {
            setWishNameError(false);
        }

        if (!wishPrice) {
            setWishPriceError(true);
            return;
        } else {
            setWishPriceError(false);
        }

        if (!wishLink) {
            setWishLinkError(true);
            return;
        } else {
            setWishLinkError(false);
        }

        if (!wishDescription) {
            setWishDescriptionError(true);
            return;
        } else {
            setWishDescriptionError(false);
        }

        try {
            // TODO 나중에 숫자만 서버에 전송하기 위해 콤마 제거
            console.log("Formatted Price:", wishPrice.replace(/,/g, ""));
            console.log(wishName, wishLink, setWishDescriptionError);
            navigate("/wishlist/add/confirm");
            // TODO: 서버 axios post
        } catch (error) {
            console.error("정보 제출 오류 : ", error);
        }
    };

    return (
        <Wrapper>
            <BackButton/>
            <Header title="선물을 등록해주세요!"/>
            <Form onSubmit={onSubmit}>
                <Hug18>
                    <InputContainer>
                        <CustomInput
                            name="wishName"
                            value={wishName}
                            type="text"
                            placeholder="선물명"
                            error={wishNameError} // error 상태 전달
                            onFocus={() => handleFocus(setWishNameError)} // focus 시 에러 초기화
                            onChange={(e) => handleInputChange(setWishName, e.target.value, 20)}
                        />
                        {wishNameError && <ErrorMessage>선물 이름을 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <PriceInputWrapper>
                            <PriceInput
                                name="wishPrice"
                                value={wishPrice}
                                type="text"
                                placeholder="선물 가격"
                                error={wishPriceError} // error 상태 전달
                                onFocus={() => handleFocus(setWishPriceError)} // focus 시 에러 초기화
                                onChange={handlePriceChange}/>
                            <CurrencyLabel>원</CurrencyLabel>
                        </PriceInputWrapper>
                        {wishPriceError && <ErrorMessage>선물 가격을 숫자로 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <CustomInput
                            name="wishLink"
                            value={wishLink}
                            type="text"
                            placeholder="선물 링크"
                            error={wishLinkError} // error 상태 전달
                            onFocus={() => handleFocus(setWishLinkError)} // focus 시 에러 초기화
                            onChange={(e) => handleInputChange(setWishLink, e.target.value, 300)}
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
                </Hug18>
                <Button
                    type="submit"
                    text="등록"
                    size="small"
                    color="black"
                    onClick={() => {
                    }}
                />
            </Form>
        </Wrapper>
    );
}

export default AddWish;