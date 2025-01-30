import { styled } from "styled-components";
import { Title, Wrapper } from "../../components/auth/SignupComponents.ts";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";

const Gap = styled.div`
    margin: 20px;
`

export default function AccountCheck(){
    const navigate = useNavigate();
    
    const onSubmit = async () => {
        const redirectUrl = localStorage.getItem("redirect_url");
        navigate(redirectUrl || "/mywish");
        localStorage.removeItem("redirect_url");
    }
    
    return(
        <Wrapper>
            <Title> 계좌가 성공적으로 </Title>
            <Title> 등록되었어요! </Title>
            <Gap />
            <Button 
                type="button"
                $text="다음"
                size="small"
                color="black"
                onClick={onSubmit}
            />
        </Wrapper>
    )
}