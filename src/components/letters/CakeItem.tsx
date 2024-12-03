import styled, { keyframes } from 'styled-components';

type CakeItemProps = {
    id: number;
    top: string;
    left: string;
    src: string;
    onClick: (id: number) => void;
};
// 랜덤 회전 애니메이션
const randomRotation = () => {
    const clockwise = Math.random() > 0.5; // 랜덤 방향 결정
    const degrees = Math.random() * 25 + 5; // 랜덤 각도 (5도~30도 사이)
    return clockwise
        ? keyframes`
              0% { transform: rotate(0deg); }
              20% { transform: rotate(${degrees}deg); }
              40% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
        `
        : keyframes`
              0% { transform: rotate(0deg); }
              20% { transform: rotate(-${degrees}deg); }
              40% { transform: rotate(0deg); }
              100% { transform: rotate(0deg); }
        `;
};

// 스타일드 컴포넌트에서 애니메이션 딜레이와 keyframes를 분리해서 설정
const StyledCakeItem = styled.img<{ top: string; left: string; delay: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 50px;
  height: 50px;
  cursor: pointer;

  animation: ${(props) => randomRotation()} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}; /* 딜레이를 개별적으로 적용 */

  &:hover {
    transform: scale(1.15);
    transition: transform 0.2s ease;
  }
`;

// 컴포넌트
const CakeItem = ({ id, top, left, src, onClick }: CakeItemProps) => {
    // 딜레이를 컴포넌트별로 고유하게 생성
    const delay = `${Math.random() * 2}s`; // 0~2초 사이의 딜레이

    return (
        <StyledCakeItem
            src={src}
            alt={`Cake item ${id}`}
            top={top}
            left={left}
            onClick={() => onClick(id)}
            delay={delay} // 각 아이템마다 랜덤 딜레이 전달
        />
    );
};

export default CakeItem;
