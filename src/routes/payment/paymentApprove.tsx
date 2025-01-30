import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import Loading from "../../components/common/loading.tsx";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
// 실제 결제 이후 도착하는 곳
// 결제 완료 처리 api 호출

export default function PaymentApprove() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // 오류 상태
    
    const pg_token = new URLSearchParams(window.location.search).get('pg_token');
    const tid = localStorage.getItem('tid');
    const gift_id = localStorage.getItem('gift_id');
    const memberId = localStorage.getItem('memberId');
    const amount = Number(localStorage.getItem('amount'));
    const uniqueString = localStorage.getItem('uniqueString');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/payments/kakao-pay/approve`,{
                    pg_token,
                    tid,
                    gift_id,
                    member_id : memberId,
                    amount,
                });

                if(response.data.status === "success") {
                    setLoading(false);
                    navigate(`/wishlist/${uniqueString}/item/${gift_id}/send/confirm`);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error("결제 승인 오류: ",error);
                setError("로딩중");
            } finally {
                setLoading(false);
            }
        };

        if (pg_token) {
            fetchData();
        } else {
            setLoading(false);
            setError("결제 정보가 없습니다.");
        }
    },[]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Wrapper>{error}</Wrapper>
    }

    return(
        <Loading />
    )
}