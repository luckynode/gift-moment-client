import styled from 'styled-components';
import cakeImage from '../../assets/Letter/cake.svg';
import CakeItem from './CakeItem';

type CakeItemType = {
    id: number;
    top: string;
    left: string;
    src: string;
    onClick: (id: number) => void;
};

type CakeProps = {
    items: CakeItemType[];
};

const CakeWrapper = styled.div`
  position: relative;
  width: 90%;
  margin: 40px auto 30px auto;
`;

const CakeImage = styled.img`
  width: 100%;
  height: auto;
`;

const Cake = ({ items = [] }: CakeProps) => {
    return (
        <CakeWrapper>
            {/* 케이크 이미지 */}
            <CakeImage src={cakeImage} alt="Cake" />
            {/* 장신구 렌더링 */}
            {items.map((item) => (
                <CakeItem
                    key={item.id}
                    id={item.id}
                    src={item.src}
                    top={item.top}
                    left={item.left}
                    onClick={item.onClick}
                />
            ))}
        </CakeWrapper>
    );
};

export default Cake;
