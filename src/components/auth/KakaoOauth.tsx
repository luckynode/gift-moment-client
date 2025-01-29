
// 이 아래부터는 oauth 컴포넌트
// 그 인가코드를 백엔드로 전송
// * 백엔드에서 카카오로 엑세스 토큰 요청
// fetchData 로 우리만의 access_token, refresh_token 으로 로그인


import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Loading from "../common/loading.tsx";

const OAuth = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code"); // URL에서 인가 코드 추출

    useEffect(() => {
        const fetchOAuthData = async (code: string) => {
            console.log("Received authorization code from URL:", code); // 인가 코드 출력

            try {/* */
                const tokenResponse = await axios.post(`https://kauth.kakao.com/oauth/token`, {}, {
                    params: {
                        grant_type: "authorization_code",
                        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
                        code: code,
                    }
                });

                const accessToken = tokenResponse.data.access_token;
                console.log("카카오 인증 토큰 :", accessToken);

                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/kakao`, {
                    accessToken: accessToken,
                });

                const { token, name, email, isExistingUser } = response.data.data; // 응답에서 토큰 추출

                // 토큰 저장
                localStorage.setItem("jwt_token", token);
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                
                // 회원 유무 확인
                const redirectUrl = localStorage.getItem("redirect_url");
                if(isExistingUser){
                    navigate(redirectUrl || "/mywish");
                    localStorage.removeItem("redirect_url");
                } else {
                    navigate("/signup");
                }

            } catch (error) {
                console.error("Error occurred while fetching OAuth data:", error);
            }
        };

        fetchOAuthData(code!);
    }, [code, navigate]);

    return <Loading />;
};

export default OAuth;
