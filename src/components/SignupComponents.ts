import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.div`
    color: #B6001E;
    font-weight: 700;
    font-size: 30px;
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
        background-color: #00000020;
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

    &[type = "submit"] {
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
    gap: 10px;
    margin: 40px 0;
`

export const Hug10 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`