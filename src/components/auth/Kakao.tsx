import styled from "styled-components";

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;

    width: 160px;
    height: 40px;

    background: url("/home/klogin.svg") no-repeat center center;
    border: none;
    cursor: pointer;
    z-index: 2;
    
    &:hover {
        opacity: 0.7;
    }
`

export default function KakaoBtn(){
    const login = () => {
        // 우선 반환값 확인
        // 카카오 로그인 uri 로 인가코드 포함 리디렉션
        const apikey = import.meta.env.VITE_KAKAO_REST_API_KEY;
        const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI

        const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${apikey}&redirect_uri=${redirectUri}`;

        // 사용자 리디렉션
        window.location.href = kakaoLoginUrl;
    }
    
    return (
        <Button onClick={login} />
    )
}