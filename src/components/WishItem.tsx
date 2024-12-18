import { styled } from "styled-components"
import blue from "../assets/wishlist/progress_blue.svg"
import green from "../assets/wishlist/progress_green.svg"
import red from "../assets/wishlist/progress_red.svg"
import { useNavigate } from "react-router-dom"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const ItemImg = styled.img`
    width: 250px;
    height: 180px;

    background: #F8A0BD;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    object-fit: cover;
`

const Info = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
`

const Name = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #262626;

    width: 170px;
`
    
const Progress = styled.div`
    font-family: 'Lato';
    display: flex;
    flex-direction: row;
    color: #6F6F6F;
    font-size: 10px
`

const ProgressBarBg = styled.div`
    width: 250px;
    height: 8px;
    background-color: #E0E0E0;
    margin-top: 5px;
    border-radius: 64px;
`

const ProgressBar = styled.div<{percent: number, color: string}>`
    width: ${props => props.percent}%;
    height: 8px;
    background-color: ${props => props.color};
    border-radius: 64px;
`

const State = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StateIcon = styled.img`
    margin-right: 3px;
`

interface WishItemProps {
    item_id: number;
    item_image: string;
    item_name: string;
    percent: number;
    state: string;
    onClick: () => void;
}

export default function WishItem({item_id, item_image, item_name, percent, state, onClick}: WishItemProps) {
    const navigate = useNavigate();
    
    // state 아이콘, progress bar 색상 설정
    let iconSrc, barcolor;
    if (state === '종료') {
        iconSrc = red;
        barcolor = '#DA1E28'
    } else if (state === '완료') {
        iconSrc = green;
        barcolor = '#198038'
    } else {
        iconSrc = blue;
        barcolor = '#0043CE'
    }

    const handleClick = () => {
        navigate(`/wishlist/item/${item_id}`);
        onClick();
    };

    return (
        <>
            {/* 사진
                이름 % 진행중
                progress bar */}
            <Wrapper onClick={handleClick}>
                <ItemImg src={item_image}/>
                <Info>
                    <Name>{item_name}</Name>
                    <State>
                        <StateIcon src={iconSrc} />
                        <Progress>{percent}% {state}</Progress>
                    </State>
                </Info>
                <ProgressBarBg>
                    <ProgressBar percent={percent} color={barcolor}/>
                </ProgressBarBg>
           </Wrapper>
        </>
    )
}