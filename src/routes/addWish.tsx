import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import {Form, Input} from "../components/SignupComponents.ts";
import {useCallback, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import Button from "../components/buttons/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import "react-toastify/dist/ReactToastify.css";
import {addWishItem} from "../apis/wishItemApi.ts";
import {
    CustomInput,
    ErrorMessage,
    FileInputContainer,
    HiddenInput,
    Info,
    InputContainer, TextArea
} from "../components/wish/WishInput.ts";
import {WishChangeWrapper} from "../components/wish/Wish.ts";


const PriceInput = styled(Input)<{ hasError?: boolean }>`
  padding-right: 50px;
  text-align: right; /* 선물 가격만 오른쪽 정렬하기 */
  border: 1px solid ${(props: { hasError?: boolean }) => (props.hasError ? 'red' : '#C8C8C8')};

  &::placeholder {
    text-align: left; /* placeholder는 그대로 왼쪽 정렬 */
  }
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

const ImageUploadWrapper = styled.div<{ thumbnail?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  width: 220px;
  height: 150px;
  background-image: url(${(props) => props.thumbnail});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  /* 투명한 검은색 오버레이 & 가운데 카메라 이미지 배치 */
  ${(props) =>
          props.thumbnail && props.thumbnail.trim() !== "/home/wish_img_input.svg" && props.thumbnail.trim() !== "" ? `
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          z-index: 1;
        }

        &::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          background-image: url("/home/wish_img_modify.svg");
          background-size: contain;
          background-repeat: no-repeat;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
      ` : ""}
`;


const AddWish = () => {
    const navigate = useNavigate();

    const [wishName, setWishName] = useState<string>("");
    const [wishPrice, setWishPrice] = useState<string>("");
    const [wishLink, setWishLink] = useState<string>("");
    const [wishDescription, setWishDescription] = useState<string>("");
    const [wishNameError, setWishNameError] = useState<boolean>(false);
    const [wishPriceError, setWishPriceError] = useState<boolean>(false);
    const [wishLinkError, setWishLinkError] = useState<boolean>(false);
    const [wishDescriptionError, setWishDescriptionError] = useState<boolean>(false);
    const [wishImage, setWishImage] = useState<File | null>(null);
    const [wishImageError, setWishImageError] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const imageUrl = useMemo(() => {
        return wishImage ? URL.createObjectURL(wishImage) : "/home/wish_img_input.svg";
    }, [wishImage]);

    useEffect(() => {
        return () => {
            if (wishImage) {
                URL.revokeObjectURL(imageUrl); // wishImage가 변경될 때 메모리 해제
            }
        };
    }, [wishImage, imageUrl]);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setWishImage(files[0]);
            setWishImageError(false);
        }
    }, []);

    const openFilePicker = () => {
        if (fileInputRef.current) {
            if ("click" in fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
    };
    const handleFocus = (setter: (value: boolean) => void) => {
        setter(false);
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
        maxLength: number,
        errorSetter: (value: boolean) => void
    ) => {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;
            setter(value);

            // 길이 초과 여부 확인
            if (value.length > maxLength) {
                errorSetter(true);
            } else {
                errorSetter(false);
            }
        };
    };


    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!wishImage) {
            setWishImageError(true);
            return;
        } else {
            setWishImageError(false);
        }
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
            const formData = new FormData();
            formData.append("title", wishName);
            formData.append("price", wishPrice.replace(/,/g, ""));
            formData.append("link", wishLink);
            formData.append("description", wishDescription);
            formData.append("image", wishImage);

            const response = await addWishItem(
                formData
            );

            console.log(response.data);

            if (response.status === 'success') {
                navigate("/wishlist/add/confirm");
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error("위시리스트 추가 중 오류 발생:", error);
            alert("위시리스트 추가 중 오류가 발생했습니다.");
        }
    }, [wishName, wishPrice, wishLink, wishDescription, wishImage, navigate]);

    return (
        <WishChangeWrapper>
            <BackButton/>
            <Header title="선물을 등록해주세요!"/>
            <Form onSubmit={onSubmit}>
                <Info>
                    <FileInputContainer>
                        <ImageUploadWrapper thumbnail={imageUrl} onClick={openFilePicker}>
                            <HiddenInput
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </ImageUploadWrapper>
                        {wishImageError && <ErrorMessage>이미지를 하나 선택해주세요!</ErrorMessage>}
                    </FileInputContainer>
                    <InputContainer>
                        <CustomInput
                            name="wishName"
                            value={wishName}
                            type="text"
                            placeholder="선물명"
                            hasError={wishNameError} // error 상태 전달
                            onFocus={() => handleFocus(setWishNameError)} // focus 시 에러 초기화
                            onChange={handleInputChange(setWishName, 20, setWishNameError)}
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
                                hasError={wishPriceError}
                                onFocus={() => handleFocus(setWishPriceError)}
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
                            hasError={wishLinkError}
                            onFocus={() => handleFocus(setWishLinkError)}
                            onChange={handleInputChange(setWishLink, 2000, setWishLinkError)}
                        />
                        {wishLinkError && <ErrorMessage>구매하려는 선물 링크를 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <TextArea
                            name="wishDescription"
                            value={wishDescription}
                            placeholder="선물 소개"
                            hasError={wishDescriptionError}
                            onFocus={() => handleFocus(setWishDescriptionError)}
                            onChange={handleInputChange(setWishDescription, 100, setWishDescriptionError)}
                        />
                        {wishDescriptionError && <ErrorMessage>선물에 대해 간략히 설명해주세요️!</ErrorMessage>}
                    </InputContainer>
                </Info>
                <Button
                    type="submit"
                    text="등록"
                    size="small"
                    color="black"
                    onClick={() => {
                    }}
                />
            </Form>
        </WishChangeWrapper>
    );
}

export default AddWish;