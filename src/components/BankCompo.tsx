import styled from "styled-components";

const Bank = styled.select`
    box-sizing: border-box;
    width: 330px;
    height: 50px;
    font-size: 20px;
    top: 0px;

    background: #FFFFFF;
    border: 1px solid #C8C8C8;
    border-radius: 8px;

    padding-left: 15px;
`

interface BankCompoProps {
    value: string;
    onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function BankCompo({ value, onchange }: BankCompoProps) {
    return(
        <Bank
            name="bank"
            value={value}
            onChange={onchange}
            required
        >
            <option value="" disabled hidden>은행 선택</option>
            <option value="카카오뱅크">카카오뱅크</option>
            <option value="농협은행">농협은행</option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="하나은행">하나은행</option>
            <option value="기업은행">기업은행</option>
        </Bank>
    )
}