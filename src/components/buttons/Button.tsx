import styled from 'styled-components';

type ButtonProps = {
    text: string;
    size?: 'small' | 'medium' | 'large';
    color?: 'black' | 'white';
    onClick: () => void;
    disabled?: boolean;
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
  font-size: 20px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
            props.color === 'black' ? '#333' : '#f0f0f0'}; /* 색상 변화 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    transform: translateY(-2px); /* 약간 위로 움직이는 효과 */
  }

  &:active {
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
                                       }) => {
    return (
        <StyledButton size={size} color={color} onClick={onClick} disabled={disabled}>
            {text}
        </StyledButton>
    );
};

export default Button;
