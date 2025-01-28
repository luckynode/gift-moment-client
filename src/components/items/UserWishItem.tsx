import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    align-items: center;
`

const ItemImg = styled.img`
    width: 250px;
    height: 180px;

    background: #F8A0BD;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    object-fit: cover;
`

const Name = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #262626;
`

interface WishItemProps {
    uniqueString: string;
    item_id: number;
    item_image: string;
    item_name: string;
}

export default function UserWishItem({uniqueString, item_id, item_image,item_name}: WishItemProps) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/wishlist/${uniqueString}/item/${item_id}`);
    };

    return (
        <>
            <Wrapper onClick={handleClick}>
                <ItemImg src={item_image}/>
                <Name>{item_name}</Name>
           </Wrapper>
        </>
    )
}