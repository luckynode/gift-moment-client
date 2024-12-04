import { styled } from "styled-components";
import { Submit100, Title, Wrapper } from "../../components/SignupComponents";
import { useNavigate } from "react-router-dom";

const StyledSubmit100 = styled(Submit100)`
    margin-top: 40px;
`;

export default function AccountCheck(){
    const navigate = useNavigate();
    
    const onSubmit = async () => {
        navigate("/mywish");
    }
    
    return(
        <Wrapper>
            <Title> 계좌가 성공적으로 </Title>
            <Title> 등록되었어요! </Title>
            <StyledSubmit100
                type="button"
                value="다음"
                onClick={onSubmit}
            />
        </Wrapper>
    )
}