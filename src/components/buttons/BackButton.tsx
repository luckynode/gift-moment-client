import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/letters/arrow_left.svg'; // 이미지 파일 경로

const BackButtonWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  padding-top: 30px; /* header 높이만큼 padding 추가 */
  left: 30px; /* 왼쪽 상단 고정 */
  &:hover {
    opacity: 0.7;
  }
`;

const BackIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // 브라우저 뒤로가기
    };

    return (
        <BackButtonWrapper onClick={handleBackClick}>
            <BackIcon src={arrowLeft} alt="뒤로가기" />
        </BackButtonWrapper>
    );
};

export default BackButton;
