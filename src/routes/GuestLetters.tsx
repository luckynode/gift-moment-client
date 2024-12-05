import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/headers/Header';
import Button from '../components/buttons/Button';
import Cake from '../components/letters/Cake';
import "react-toastify/dist/ReactToastify.css";

import redFlower from '../assets/letters/red_flower.svg';
import whiteStar from '../assets/letters/white_star.svg';
import orangeFlower from '../assets/letters/orange_flower.svg';
import sparkle from '../assets/letters/sparkle.svg';
import rainbowStar from '../assets/letters/rainbow_star.svg';
import cherry from '../assets/letters/cherry.svg';
import cloud from '../assets/letters/cloud.svg';
import blueEnvelope from '../assets/letters/blue_envelope.svg';
import mintEnvelope from '../assets/letters/mint_envelope.svg';
import whiteFlower from '../assets/letters/white_flower.svg';
import strawberry from '../assets/letters/strawberry.svg';
import heart from '../assets/letters/heart.svg';
import yellowMusic from '../assets/letters/yellow_music.svg';
import blackMusic from '../assets/letters/black_music.svg';
import InstructionText from "../components/InstructionText.tsx";
import {useNavigate} from "react-router-dom";
import BackButton from "../components/buttons/BackButton.tsx";

// 장신구 이미지 경로 배열
const ornamentImages = [
    redFlower,
    whiteStar,
    orangeFlower,
    sparkle,
    rainbowStar,
    cherry,
    cloud,
    blueEnvelope,
    mintEnvelope,
    whiteFlower,
    strawberry,
    heart,
    yellowMusic,
    blackMusic,
];

// 장신구 위치 배열
// FIXME 장신구 위치는 px로 잡으면 반응형 어려워짐. %로 변경하는 것 고려해봐야 할듯
const positions = [
    {top: '125px', left: '35px'},  // redFlower
    {top: '122px', left: '100px'},  // whiteStar
    {top: '115px', left: '167px'},  // orangeFlower
    {top: '120px', left: '225px'},  // sparkle
    {top: '190px', left: '32px'},  // rainbowStar
    {top: '185px', left: '102px'},  // cherry
    {top: '185px', left: '165px'},  // cloud
    {top: '180px', left: '232px'},  // blueEnvelope
    {top: '250px', left: '20px'},  // mintEnvelope
    {top: '245px', left: '95px'},  // whiteFlower
    {top: '245px', left: '165px'},  // strawberry
    {top: '245px', left: '230px'},  // heart
    {top: '45px', left: '16px'},  // yellowMusic
    {top: '45px', left: '240px'},  // blackMusic
];

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding: 10px 20px;
  position: relative; 
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;


// NOTE 현재는 하드코딩된 값 사용. 나중에 동적으로 처리 필요
const GuestLetters = () => {
    const navigate = useNavigate();

    // TODO 백엔드 API로부터 내 편지 개수 받아오기
    const [letterCount] = useState<number>(14);



    // 표시할 장신구 데이터 생성
    const items = ornamentImages.slice(0, letterCount).map((src, index) => ({
        id: index,
        src,
        top: positions[index].top,
        left: positions[index].left,
        onClick: () => {},
    }));

    return (
        <div>
            {/*TODO 백엔드 API 유저 정보 받아오기*/}
            <HeaderWrapper>
                <BackButton/>
                <Header title="경희님의 편지함"/>
            </HeaderWrapper>
            <Cake items={items}/> {/* items를 Cake에 전달 */}
            <InstructionText iconText="Notice" message={`생일을 함께 축하해주세요! \n편지를 보낸 후에 선물 전달이 가능합니다!`}/>
            <ButtonContainer>
                <Button type="button" text="편지 쓰러 가기" size="large" color="white" onClick={() => navigate("/write-letter")}/>
                <Button type="button" text="위시리스트 보러 가기" size="large" color="black" onClick={() => navigate("/")}/>
            </ButtonContainer>
        </div>
    );
};

export default GuestLetters;