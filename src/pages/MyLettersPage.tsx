import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/headers/Header';
import Button from '../components/buttons/Button';
import Cake from '../components/letters/Cake';
import { toast } from "react-toastify";
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
const positions = [
    { top: '135px', left: '54px' },  // redFlower
    { top: '140px', left: '115px' },  // whiteStar
    { top: '135px', left: '177px' },  // orangeFlower
    { top: '135px', left: '235px' },  // sparkle
    { top: '200px', left: '42.6px' },  // rainbowStar
    { top: '200px', left: '110px' },  // cherry
    { top: '200px', left: '181.47px' },  // cloud
    { top: '200px', left: '252px' },  // blueEnvelope
    { top: '260px', left: '30px' },  // mintEnvelope
    { top: '260px', left: '105px' },  // whiteFlower
    { top: '260px', left: '175px' },  // strawberry
    { top: '260px', left: '240px' },  // heart
    { top: '55px', left: '20px' },  // yellowMusic
    { top: '61px', left: '250.57px' },  // blackMusic
];

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;  
  gap: 20px;  
  width: 100%;  
  align-items: center;  
`;

const MyLettersPage = () => {
    // TODO 백엔드 API로부터 오늘이 생일인지 여부 받아오기
    const [isBirthday, setIsBirthday] = useState<boolean>(false);

    //      생일이면 생일 축하 문구 페이지부터 띄우기

    // TODO 백엔드 API로부터 내 편지 개수 받아오기
    const [letterCount] = useState<number>(14);

    // TODO 장신구 클릭 시 편지지 페이지로 이동
    const handleItemClick = (id: number) => {
        if (isBirthday) {
        } else {
            toast.success("편지는 생일 이후에 공개됩니다! ☺️️", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    // 표시할 장신구 데이터 생성
    const items = ornamentImages.slice(0, letterCount).map((src, index) => ({
        id: index,
        src,
        top: positions[index].top,
        left: positions[index].left,
        onClick: handleItemClick,
    }));

    const copyLinkToClipboard = () => {
        // TODO 백엔드 API로부터 사용자 고유 링크 url 받기
        const currentUrl = window.location.href; // 현재 URL 가져오기
        navigator.clipboard.writeText(currentUrl)  // URL을 클립보드에 복사
            .then(() => {
                toast.success(
                    <>
                        링크가 복사되었습니다! <br />
                        원하는 선물을 친구들에게 공유해 보세요! ☺️
                    </>,
                    {
                        position: "top-center",
                        autoClose: 5000,
                    }
                );
            })
            .catch((err) => {
                console.error('링크 복사 실패:', err);
            });
    };

    return (
        <div>
            <Header title="OOO님의 편지함" hasBorder={true} />
            <Cake items={items} /> {/* items를 Cake에 전달 */}
            <ButtonContainer>
                {/*TODO 마이페이지 이동 기능 구현*/}
                <Button text="마이페이지" size="large" color="white" onClick={() => alert('마이페이지 이동')} />
                <Button text="편지 링크 복사하기" size="large" color="black" onClick={copyLinkToClipboard} />
            </ButtonContainer>
        </div>
    );
};

export default MyLettersPage;
