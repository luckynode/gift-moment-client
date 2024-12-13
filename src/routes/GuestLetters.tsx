import {useState} from 'react';
import styled from 'styled-components';
import Header from '../components/headers/Header';
import Button from '../components/buttons/Button';
import Cake from '../components/letters/Cake';
import "react-toastify/dist/ReactToastify.css";
import { ornamentImages } from '../assets/ornamentImages';
import { ornamentPositions } from '../assets/ornamentImages';

import InstructionText from "../components/InstructionText.tsx";
import {useNavigate} from "react-router-dom";
import BackButton from "../components/buttons/BackButton.tsx";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;


// NOTE 현재는 하드코딩된 값 사용. 나중에 동적으로 처리 필요
const GuestLetters = () => {
    const navigate = useNavigate();

    // NOTE 게스트 편지함 링크에서 장신구 개수는 14개로 고정
    const [letterCount] = useState<number>(14);

    // 표시할 장신구 데이터 생성
    const items = ornamentImages.slice(0, letterCount).map((src, index) => ({
        id: index,
        src,
        top: ornamentPositions[index].top,
        left: ornamentPositions[index].left,
        onClick: () => {
        },
    }));

    return (
        <div>
            {/*TODO 백엔드 API 유저 정보 받아오기*/}
            <BackButton/>
            <Header title="경희님의 편지함"/>
            <Cake items={items}/> {/* items를 Cake에 전달 */}
            <InstructionText iconText="Notice" message={`생일을 함께 축하해주세요!\n편지 작성 후 선물 전달이 가능합니다!`}/>
            <ButtonContainer>
                <Button type="button" text="편지 쓰러 가기" size="large" color="white"
                        onClick={() => navigate("/write-letter")}/>
                <Button type="button" text="위시리스트 보러 가기" size="large" color="black" onClick={() => navigate("/")}/>
            </ButtonContainer>
        </div>
    );
};

export default GuestLetters;