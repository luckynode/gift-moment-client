import styled from 'styled-components';

type CakeItemProps = {
    id: number;
    top: string;
    left: string;
    src: string;
    onClick: (id: number) => void;
};

const StyledCakeItem = styled.img<{ top: string; left: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
    transition: transform 0.2s ease;
  }
`;

const CakeItem = ({ id, top, left, src, onClick }: CakeItemProps) => {
    return (
        <StyledCakeItem
            src={src}
            alt={`Cake item ${id}`}
            top={top}
            left={left}
            onClick={() => onClick(id)}
        />
    );
};

export default CakeItem;
