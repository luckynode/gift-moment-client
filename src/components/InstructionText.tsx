import styled from 'styled-components';

type InstructionTextProps = {
    iconText: string;
    message: string;
};

const InstructionTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Icon = styled.div`
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
`;

const Text = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: black;
  white-space: pre-wrap; /* 줄바꿈을 그대로 반영 */
`;

const InstructionText = ({iconText, message}: InstructionTextProps) => {
    return (
        <InstructionTextWrapper>
            <Icon>{iconText}</Icon>
            <Text>
                {message.split('\n').map((line, index) => (
                    <span key={index}>{line}
                        <br/>
                    </span>
                ))}
            </Text>
        </InstructionTextWrapper>
    );
};

export default InstructionText;
