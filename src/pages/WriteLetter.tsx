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

const Input = styled.div`
  flex: 1;
  font-size: 15px;
  border-bottom: 2px solid black;
  padding: 5px 2px 5px 2px;
  margin-left: 5px;
  color: black;
  min-height: 20px;
  outline: none;
  transition: border-color 0.3s ease;
  font-family: 'Lato', sans-serif;
`;

const WriteLetter = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [from, setFrom] = useState('');

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
                        contentEditable
                        data-placeholder="받는 사람"
                        onInput={(e) => setTo((e.target as HTMLDivElement).textContent || '')}
                    />
                </InputRow>

                <MessageColumn>
                    {/* MESSAGE */}
                    <Label>MESSAGE</Label>
                    <TextAreaContainer>
                        <TextArea
                            placeholder="생일 축하 메시지를 작성하세요!"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <CharacterCount>{`${message.length}/500`}</CharacterCount>
                    </TextAreaContainer>
                </MessageColumn>

                {/* FROM */}
                <InputRow>
                    <Label>FROM</Label>
                    <Input
                        contentEditable
                        data-placeholder="보내는 사람"
                        onInput={(e) => setFrom((e.target as HTMLDivElement).textContent || '')}
                    />
                </InputRow>
                {/* 완료 버튼 */}
                <Button type="submit" text="완료" size="small" color="black"/>
            </Form>
        </div>
    );
};

export default WriteLetter;
