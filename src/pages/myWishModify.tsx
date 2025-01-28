import BackButton from "../components/buttons/BackButton.tsx";
import Header from "../components/headers/Header.tsx";
import {Input} from "../components/SignupComponents.ts";
import styled from "styled-components";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Button from "../components/buttons/Button.tsx";
import {RowButtonContainer} from "../routes/letterSentConfirm.tsx";
import {WishInput} from "./myWishDetail.tsx";
import WishImgDetail from "../assets/wishlist/wish_img_detail.svg";
import MyWishDeleteConfirm from "../routes/myWishDeleteConfirm.tsx";
import cameraIcon from "../assets/wishlist/wish_img_modify.svg";
import {deleteWishItem, modifyWishItem} from "../apis/wishItemApi.ts";

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

export const TextArea = styled.textarea<{ hasError?: boolean }>`
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

const CustomInput = styled(Input)<{ hasError?: boolean }>`
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ddd')};
`;

const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  gap: 5px; /* 입력 필드와 오류 메시지 간격 */
`;

const ImageUploadWrapper = styled.div<{ thumbnail?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  width: 300px;
  height: 300px;
  background-image: url(${(props: { thumbnail: string }) => props.thumbnail});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  /* 투명한 검은색 오버레이 */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1); /* 투명도 10% 검은색 */
    border-radius: 8px;
    z-index: 1; /* 카메라 아이콘 위에 표시되도록 */
  }

  /* 카메라 아이콘 */

  &::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background-image: url(${cameraIcon});
    background-size: contain;
    background-repeat: no-repeat;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2; /* 검은색 배경 오버레이 위에 표시되도록 */
  }
`;

const HiddenInput = styled.input`
  display: none;
`;


const MyWishModify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {wishData} = location.state || {}; // 전달된 데이터 받기
    useEffect(() => {
        console.log("위시데이터:", wishData);
    }, [location.state]);

    const {itemId} = useParams<{ itemId: string }>();

    const [wishImage, setWishImage] = useState<File | null>(null); // 업로드용 파일

    // useMemo를 사용하여 wishImageUrl을 캐싱함
    const wishImageUrl = useMemo(
        () => (wishImage ? URL.createObjectURL(wishImage) : wishData?.gift?.image || WishImgDetail),
        [wishImage, wishData?.gift?.image]
    );
    const [wishImageUrlError, setWishImageUrlError] = useState(false);

    const [wishLink, setWishLink] = useState(wishData.gift?.link);
    const [wishDescription, setWishDescription] = useState(wishData.gift?.description);

    const [wishLinkError, setWishLinkError] = useState(false);
    const [wishDescriptionError, setWishDescriptionError] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFocus = (setter: (value: boolean) => void) => {
        setter(false); // 에러 상태 초기화
    };

    const handleDeleteConfirm = async () => {
        try {
            if (!itemId) {
                console.error("itemId가 없습니다.");
                return;
            }
            const response = await deleteWishItem(Number(itemId));
            if (response.status === 'success') {
                console.log(response.message); // 성공 메시지 출력
                setIsModalOpen(false); // 모달 닫기
                navigate("/wishlist");
            } else {
                console.error("위시리스트 삭제 실패:", response.message);
            }
        } catch (error) {
            console.error("위시리스트 삭제 중 오류 발생:", error);
            alert("위시리스트 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (
        setter: (value: string) => void,
        maxLength: number,
        errorSetter: (value: boolean) => void
    ) => {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;

            // 입력 값 설정
            setter(value);

            // 길이 초과 여부 확인
            if (value.length > maxLength) {
                errorSetter(true);
            } else {
                errorSetter(false);
            }
        };
    };

    // FIXME AddWish.tsx와 공통된 부분 함수로 묶어서 사용하기
    // FIXME input값 하나 업데이트인데, 코드가 너무 복잡해짐
    const handleComplete = async () => {
        // 순차적으로 에러를 처리
        if (!wishImageUrl) {
            setWishImageUrlError(true);
            return;
        } else {
            setWishImageUrlError(false);
        }
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
        if (!itemId) {
            console.error("itemId가 없습니다.");
            return;
        }

        try {
            if (!itemId) {
                console.error("itemId가 없습니다.");
                return;
            }

            console.log("수정된 데이터는?:", {wishImageUrl, wishLink, wishDescription});

            const formData = new FormData();
            if (wishImage) {
                formData.append("image", wishImage); // 이미지 파일이 있을 경우에만 추가
            }
            formData.append("link", wishLink);
            formData.append("description", wishDescription);

            const response = await modifyWishItem(Number(itemId),
                formData
            );
            console.log(response.data);
            if (response.status === 'success') {
                navigate(`/wishlist/item/${itemId}`);
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error("위시리스트 수정 중 오류 발생:", error);
            alert("위시리스트 수정 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        return () => {
            if (wishImage && wishImageUrl.startsWith("blob:")) {
                URL.revokeObjectURL(wishImageUrl); // Blob URL 메모리 해제
            }
        };
    }, [wishImage, wishImageUrl]);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target?.files[0]) {
            setWishImage(e.target?.files[0]); // 파일 저장
            setWishImageUrlError(false);
        }
    }, []);

// 이미지 업로드 버튼 클릭 시 input[type="file"]이 클릭되도록 함
    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <BackButton/>
            <Wrapper>
                <Subtitle>{wishData?.birth} D-{wishData?.dday}</Subtitle>
                <Header title={`${wishData?.name}님의 위시아이템`}/>
                <Info>
                    <FileInputContainer>
                        <ImageUploadWrapper thumbnail={wishImageUrl} onClick={openFilePicker}>
                            <HiddenInput
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </ImageUploadWrapper>
                        {wishImageUrlError && <ErrorMessage>이미지를 하나 선택해주세요!</ErrorMessage>}
                    </FileInputContainer>
                    {/* 선물명과 가격은 수정 못함 */}
                    <WishDisabledInput>{wishData?.gift?.title}</WishDisabledInput>
                    <WishDisabledInput>{wishData?.gift?.price ? Number(wishData.gift.price).toLocaleString() : "0"}원</WishDisabledInput>
                    {/* 선물 링크와 선물 설명은 수정 가능 */}
                    <InputContainer>
                        <CustomInput
                            name="wishLink"
                            value={wishLink}
                            type="text"
                            placeholder="선물 링크"
                            hasError={wishLinkError} // 에러 상태 전달
                            onFocus={() => handleFocus(setWishLinkError)} // 에러 초기화
                            onChange={handleInputChange(setWishLink, 2000, setWishLinkError)}
                        />
                        {wishLinkError && <ErrorMessage>구매하려는 선물 링크를 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                    <InputContainer>
                        <TextArea
                            name="wishDescription"
                            value={wishDescription}
                            placeholder="선물 소개"
                            hasError={wishDescriptionError} // error 상태 전달
                            onFocus={() => handleFocus(setWishDescriptionError)} // focus 시 에러 초기화
                            onChange={handleInputChange(setWishDescription, 100, setWishDescriptionError)}
                        />
                        {wishDescriptionError && <ErrorMessage>선물에 대해 간략히 설명해주세요️!</ErrorMessage>}
                    </InputContainer>
                </Info>
                <RowButtonContainer>
                    <Button type="button" text="삭제" size="small" color="white" onClick={() => setIsModalOpen(true)}/>
                    <Button type="button" text="완료" size="small" color="black" onClick={handleComplete}/>
                </RowButtonContainer>
            </Wrapper>

            {/* 삭제 확인 모달 */}
            {isModalOpen && (
                <MyWishDeleteConfirm
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}
        </>
    )
}

export default MyWishModify;