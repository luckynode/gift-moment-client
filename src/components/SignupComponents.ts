import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.div`
    font-weight: 700;
    font-size: 30px;
    line-height: 50px;

    color: transparent;
    display: inline-block;

    background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); /* 중앙만 살짝 연하게 */
    background-clip: text;
`

export const SubTitle = styled.div`
    font-family: 'Lato';
    font-size: 20px;
    line-height: 50px;
    
    color: transparent;
    display: inline-block;

    background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); /* 중앙만 살짝 연하게 */
    background-clip: text;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Input = styled.input`
    box-sizing: border-box;
    width: 330px;
    height: 50px;
    font-size: 20px;
    top: 0px;

    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 8px;

    padding-left: 15px;

    &:disabled {
        background-color: #FFFFFF90;
    }
`

export const Submit250 = styled.input`
    width: 250px;
    height: 48px;
    background-color: #000000;
    border-radius: 8px;
    border: none;
    color: white;

    font-size: 20px;
    font-weight: 600;
    font-family: 'Pretendard';

    &[type = "submit"],
    &[type = "button"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        };
    }
`

export const Submit100 = styled.input`
    width: 100px;
    height: 48px;
    background-color: #000000;
    border-radius: 8px;
    border: none;
    color: white;

    font-size: 20px;
    font-weight: 600;

    &[type = "submit"],
    &[type = "button"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        };
    }
`

export const Detail = styled.div`
    font-size: 12px;
    color: #000000;
    font-family: 'Lato';
`

export const Hug18 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    margin: 40px 0;
`

export const Hug10 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`