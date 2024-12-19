import Header from "../components/headers/Header.tsx";
import Button from "../components/buttons/Button.tsx";
import {useNavigate} from "react-router-dom";
import {Hug18, Wrapper} from "../components/SignupComponents.ts";


const AddWishConfirm = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header title="선물 등록이 완료되었어요!"/>
            <Hug18>
                <Button type="button" text="선물 추가 등록" size="medium" color={"white"} onClick={() => {
                    navigate("/wishlist/add");
                }}/>
                <Button type="button" text="나의 위시리스트" size="medium" color={"black"} onClick={() => {
                    navigate("/wishlist")
                }}/>
            </Hug18>
        </Wrapper>
    )
}

export default AddWishConfirm;