import redFlower from './letters/red_flower.svg';
import whiteStar from './letters/white_star.svg';
import orangeFlower from './letters/orange_flower.svg';
import sparkle from './letters/sparkle.svg';
import rainbowStar from './letters/rainbow_star.svg';
import cherry from './letters/cherry.svg';
import cloud from './letters/cloud.svg';
import blueEnvelope from './letters/blue_envelope.svg';
import mintEnvelope from './letters/mint_envelope.svg';
import whiteFlower from './letters/white_flower.svg';
import strawberry from './letters/strawberry.svg';
import heart from './letters/heart.svg';
import yellowMusic from './letters/yellow_music.svg';
import blackMusic from './letters/black_music.svg';

// 장신구 이미지 경로 배열
export const ornamentImages = [
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

// FIXME 장신구 위치는 px로 잡으면 반응형 어려워짐. %로 변경하는 것 고려해봐야 할듯
// 장신구 위치 배열
export const ornamentPositions = [
    {top: '125px', left: '55px'},  // redFlower
    {top: '122px', left: '120px'},  // whiteStar
    {top: '115px', left: '187px'},  // orangeFlower
    {top: '120px', left: '245px'},  // sparkle
    {top: '190px', left: '52px'},  // rainbowStar
    {top: '185px', left: '122px'},  // cherry
    {top: '185px', left: '185px'},  // cloud
    {top: '180px', left: '252px'},  // blueEnvelope
    {top: '250px', left: '40px'},  // mintEnvelope
    {top: '245px', left: '115px'},  // whiteFlower
    {top: '245px', left: '185px'},  // strawberry
    {top: '245px', left: '250px'},  // heart
    {top: '45px', left: '36px'},  // yellowMusic
    {top: '45px', left: '260px'},  // blackMusic
];