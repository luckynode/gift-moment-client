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

const TextArea = styled.textarea<{ error?: boolean }>`
  width: 280px;
  background: #FFF9E6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
  font-size: 15px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
  border-radius: 20px;
  resize: none;
  padding: 20px 25px;

  &:focus {
    outline: none;
    border: 1px solid #ddd;
  }
`;

const CharacterCount = styled.div`
  text-align: right;
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

const Input = styled.input<{ error?: boolean }>`
  flex: 1;
  padding: 8px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => (props.error ? 'red' : '#ddd')};
  margin-left: 5px;
  color: black;
  min-height: 20px;
  outline: none;

  &:focus {
    outline: none;
    border: 1px solid #ddd;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-left: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  width: 100%;
  gap: 5px; /* 입력 필드와 오류 메시지 간격 */
`;

const WriteLetter = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [from, setFrom] = useState('');

    const [toError, setToError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [fromError, setFromError] = useState(false);

    const handleFocus = (setter: (value: boolean) => void) => {
        setter(false); // 에러 상태 초기화
    };

    const handleInputChange = (setter: (value: string) => void, value: string, maxLength: number) => {
        if (value.length <= maxLength) {
            setter(value); // 입력 길이가 제한 내에 있을 경우만 상태 업데이트
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 순차적으로 에러를 처리
        if (!to) {
            setToError(true);
            return;
        } else {
            setToError(false);
        }

        if (!message) {
            setMessageError(true);
            return;
        } else {
            setMessageError(false);
        }

        if (!from) {
            setFromError(true);
            return;
        } else {
            setFromError(false);
        }
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
                {/* 편지 받는 사람 */}
                <InputRow>
                    <Label>TO</Label>
                    <InputContainer>
                        <Input
                            name="to"
                            value={to}
                            placeholder="받는 사람 (20자 이내)"
                            error={toError} // error 상태 전달
                            onFocus={() => handleFocus(setToError)} // focus 시 에러 초기화
                            onChange={(e) => handleInputChange(setTo, e.target.value, 20)}
                        />
                        {toError && <ErrorMessage>편지 받는 사람을 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                </InputRow>

                {/* 편지 내용 */}
                <MessageColumn>
                    <Label>MESSAGE</Label>
                    <InputContainer>
                        <TextArea
                            placeholder="생일 축하 메시지를 작성하세요!"
                            value={message}
                            error={messageError} // error 상태 전달
                            onFocus={() => handleFocus(setMessageError)} // focus 시 에러 초기화
                            onChange={(e) => handleInputChange(setMessage, e.target.value, 500)}
                        />
                        <CharacterCount>{`${message.length}/500`}</CharacterCount>
                        {messageError && <ErrorMessage>생일 편지를 작성해주세요!</ErrorMessage>}
                    </InputContainer>
                </MessageColumn>

                {/* 편지 보내는 사람 */}
                <InputRow>
                    <Label>FROM</Label>
                    <InputContainer>
                        <Input
                            name="from"
                            value={from}
                            placeholder="보내는 사람 (20자 이내)"
                            error={fromError} // error 상태 전달
                            onFocus={() => handleFocus(setFromError)} // focus 시 에러 초기화
                            onChange={(e) => handleInputChange(setFrom, e.target.value, 20)}
                        />
                        {fromError && <ErrorMessage>편지 보내는 사람을 입력해주세요!</ErrorMessage>}
                    </InputContainer>
                </InputRow>
                {/* 완료 버튼 */}
                <Button type="submit" text="완료" size="small" color="black" onClick={() => {}}/>
            </Form>
        </div>
    );
};

export default WriteLetter;