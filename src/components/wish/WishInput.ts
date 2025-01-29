import styled from "styled-components";
import {Input} from "../auth/SignupComponents.ts";

export const Info = styled.div`
  gap: 20px;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 5px; 
`;

export const CustomInput = styled(Input)<{ hasError?: boolean }>`
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ddd')};
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  box-sizing: border-box;
  width: 330px;
  height: 150px;
  font-size: 20px;
  resize: none;
  background: #FFFFFF;
  border: 1px solid #C8C8C8;
  border-radius: 8px;
  padding: 15px;

  &:disabled {
    background-color: #FFFFFF90;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px; 
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-left: 10px;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const WishInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 330px;
  min-height: 50px;
  box-sizing: border-box;
  padding: 10px;

  font-size: 20px;
  font-family: 'Lato';
  font-weight: 500;

  background: #FFFFFF;
  border: 1px solid #C8C8C8;
  border-radius: 8px;
`
