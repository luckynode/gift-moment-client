import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const ModalContent = styled.div`
  background: linear-gradient(180deg, #FFFFFF 0%, #FFDDEE 80%, #FFFFFF 100%); 
  border-radius: 30px;
  width: 270px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 600px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ToText = styled.h4`
  margin: 10px;
  font-size: 18px;
  color: black;
  text-align: left;
`;

const FromText = styled.h4`
  margin: 10px;
  font-size: 18px;
  color: black;
  text-align: right;
`;

const ContentBox = styled.div`
  margin: 20px 0;
  background-color: #FFF7DF;
  padding: 20px;
  border-radius: 20px;
  white-space: pre-wrap; 
  font-size: 16px;
  color: black;
  height: 70%;
  max-height: 325px; 
  overflow-y: auto; 
`;


type LetterDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    letter: {
        id: number;
        to: string;
        from: string;
        content: string;
    } | null;
};

const LetterDetailModal = ({isOpen, onClose, letter,}: LetterDetailModalProps) => {
    if (!isOpen || !letter) return null;

    return (
        <ModalBackground onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>X</CloseButton>
                <ToText>TO. {letter.to}</ToText>
                <ContentBox>
                    <p>{letter.content}</p>
                </ContentBox>
                <FromText>FROM. {letter.from}</FromText>
            </ModalContent>
        </ModalBackground>
    );
};

export default LetterDetailModal;
