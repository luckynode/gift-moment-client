import BackButton from "../components/buttons/BackButton.tsx";
import {useState} from "react";
import Button from "../components/buttons/Button.tsx";
import styled from "styled-components";

const Form = styled.form`
  margin: 60px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const TextAreaContainer = styled.div`
  position: relative;
`;

const TextArea = styled.textarea`
  width: 280px;
  background: #fff9e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  padding: 20px 25px;

  &:focus {
    outline: none; 
    border: 1px solid #ddd; 
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  color: #808192;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: black;
  width: 100%;
  gap: 10px;
`;

const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 17px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  margin-left: 5px;
  color: black;
  min-height: 20px;
  outline: none;
  font-family: 'Lato', sans-serif;
`;

const WriteLetter = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [from, setFrom] = useState('');

    const handleInputChange = (setter: (value: string) => void, value: string, maxLength: number) => {
        if (value.length <= maxLength) {
            setter(value); // 입력 길이가 제한 내에 있을 경우만 상태 업데이트
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(to, message, from);
            // TODO: 서버 axios post
        } catch (error) {
            console.error("정보 제출 오류 : ", error);
        }
    };

    return (
        <div>
            <BackButton/>
            <Form onSubmit={onSubmit}>
                {/* TO */}
                <InputRow>
                    <Label>TO</Label>
                    <Input
                        name="to"
                        value={to}
                        placeholder="받는 사람 (20자 이내)"
                        required
                        onChange={(e) => handleInputChange(setTo, e.target.value, 20)}
                    />
                </InputRow>

                <MessageColumn>
                    {/* MESSAGE */}
                    <Label>MESSAGE</Label>
                    <TextAreaContainer>
                        <TextArea
                            placeholder="생일 축하 메시지를 작성하세요!"
                            value={message}
                            required
                            onChange={(e) => handleInputChange(setMessage, e.target.value, 500)}
                        />
                        <CharacterCount>{`${message.length}/500`}</CharacterCount>
                    </TextAreaContainer>
                </MessageColumn>

                {/* FROM */}
                <InputRow>
                    <Label>FROM</Label>
                    <Input
                        name="from"
                        value = {from}
                        placeholder="보내는 사람 (20자 이내)"
                        required
                        onChange={(e) => handleInputChange(setFrom, e.target.value, 20)}
                    />
                </InputRow>
                {/* 완료 버튼 */}
                <Button type="submit" text="완료" size="small" color="black"/>
            </Form>
        </div>
    );
};

export default WriteLetter;
