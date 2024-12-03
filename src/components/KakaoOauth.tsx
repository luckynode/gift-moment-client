
// 이 아래부터는 oauth 컴포넌트
// 그 인가코드를 백엔드로 전송
// * 백엔드에서 카카오로 엑세스 토큰 요청
// fetchData 로 우리만의 access_token, refresh_token 으로 로그인

// 아래 구분은 백에서??
// 존재 O -> fetchData 로그인 성공 위시리스트 확인 페이지

// 존재 X -> 정보 입력 페이지 ~~

import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code"); // URL에서 인가 코드 추출

    useEffect(() => {
        const fetchOAuthData = async (code: string) => {
            console.log("Received authorization code from URL:", code); // 인가 코드 출력
            navigate("/");

            // try {
            //     const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/kakao`, {
            //         code: code,
            //     });

            //     const { accessToken, refreshToken } = response.data.data; // 응답에서 토큰 추출

            //     // 토큰 저장
            //     localStorage.setItem("accessToken", accessToken);
            //     localStorage.setItem("refreshToken", refreshToken);

            //     // 로그인 성공 후 페이지 이동
            //     // 정보입력 또는 선물 #7 페이지로 이동
            //     navigate("/home");
            // } catch (error) {
            //     console.error("Error occurred while fetching OAuth data:", error);
            // }
        };

        // 인가 코드가 존재할 경우에만 요청
        if (code) {
            fetchOAuthData(code);
        }
    }, [code, navigate]);

    return <div>Loading...</div>; // 로딩 중 표시
};

export default OAuth;
