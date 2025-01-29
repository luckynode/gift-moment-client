import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../../assets/letters/arrow_left.svg';

const BackButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  padding-right: 320px;
  transform: translateX(-50%);
  z-index: 1000;
  cursor: pointer;
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
        navigate(-1);
    };

    return (
        <BackButtonWrapper onClick={handleBackClick}>
            <BackIcon src={arrowLeft} alt="뒤로가기" />
        </BackButtonWrapper>
    );
};

export default BackButton;
