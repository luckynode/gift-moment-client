import styled from 'styled-components';

type ButtonProps = {
    text: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'black' | 'white';
    onClick: () => void;
    disabled?: boolean;
    type? : 'button' | 'submit';
};


const StyledButton = styled.button<ButtonProps>`
  width: ${(props) =>
          props.size === 'small' ? '100px' : props.size === 'medium' ? '150px' : '250px'};
  height: 48px;
  background-color: ${(props) => (props.color === 'black' ? '#000' : '#fff')};
  color: ${(props) => (props.color === 'black' ? '#fff' : '#000')};
  border: ${(props) => (props.color === 'white' ? '1px solid #000' : 'none')};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: 'Pretendard', sans-serif;

  &:hover {
    background-color: ${(props) =>
            props.color === 'black' ? '#333' : '#f7f7f7'}; /* 색상 변화 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 부드럽게 그림자 효과 */
    transform: translateY(-3px); /* 약간 위로 움직이는 효과 */
  }

  &:active {
    background-color: ${(props) =>
            props.color === 'black' ? '#555' : '#e6e6e6'}; /* 클릭 시 색상 조금 더 어두운 톤으로 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 클릭 시 그림자 축소 */
    transform: translateY(0); /* 클릭 시 원래 위치로 */
  }
`;

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           size = 'large',
                                           color = 'black',
                                           onClick,
                                           disabled = false,
                                           type = 'submit',
                                       }) => {
    return (
        <StyledButton text={text} size={size} color={color} onClick={onClick} disabled={disabled} type={type}>
            {text}
        </StyledButton>
    );
};

export default Button;
