import styled, { keyframes } from 'styled-components';

type CakeItemProps = {
    id: number;
    top: string;
    left: string;
    src: string;
    onClick: (id: number) => void;
};

type StyledCakeItemProps = {
    top: string;
    left: string;
    delay: string;
    isClockwise: boolean;
};

const clockwiseRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(20deg);
  }
  40% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const counterClockwiseRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-20deg);
  }
  40% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const StyledCakeItem = styled.img.attrs<StyledCakeItemProps>((props) => ({
    style: {
        top: props.top,
        left: props.left,
        animationDelay: props.delay,
    },
}))<StyledCakeItemProps>`
  position: absolute;
  width: 50px;
  height: 50px;
  cursor: pointer;

  animation: ${(props) =>
          props.isClockwise ? clockwiseRotation : counterClockwiseRotation} 4s ease-in-out infinite;

  &:hover {
    transform: scale(1.15);
    transition: transform 0.2s ease;
  }
`

const CakeItem = ({ id, top, left, src, onClick }: CakeItemProps) => {
    const delay = `${Math.random() * 2}s`; // 랜덤 딜레이
    const isClockwise = Math.random() > 0.5; // 랜덤 방향

    return (
        <StyledCakeItem
            src={src}
            alt={`Cake item ${id}`}
            top={top}
            left={left}
            onClick={() => onClick(id)}
            delay={delay}
            isClockwise={isClockwise}
        />
    );
};

export default CakeItem;
