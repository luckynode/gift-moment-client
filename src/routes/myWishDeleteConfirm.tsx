import styled from "styled-components";
import Button from "../components/buttons/Button";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 30px;
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

const ModalText = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

interface MyWishDeleteConfirmProps {
    onConfirm: () => void;
    onCancel: () => void;
}

function MyWishDeleteConfirm({ onConfirm, onCancel }: MyWishDeleteConfirmProps) {
    return (
        <ModalOverlay>
            <ModalContent>
                <ModalText>정말 삭제하시겠습니까?</ModalText>
                <ModalButtonContainer>
                    <Button type="button" size ="small" text="예" color="white" onClick={onConfirm} />
                    <Button type="button" size ="small" text="아니오" color="black" onClick={onCancel} />
                </ModalButtonContainer>
            </ModalContent>
        </ModalOverlay>
    );
}

export default MyWishDeleteConfirm;
