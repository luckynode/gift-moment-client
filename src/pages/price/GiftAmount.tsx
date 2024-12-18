import { useState } from "react";
import InputPrice from "./InputPrice";
import PriceCheck from "./PriceCheck";

export default function GiftAmount() {
    const [page, setPage] = useState('input');
    const [price, setPrice] = useState<number>(0); // 가격 상태 추가

    const handleNext = (priceValue: number) => {
        setPrice(priceValue); // 가격 상태 업데이트
        setPage('check'); // 페이지 전환
    };

    const renderPage = () => {
        switch (page) {
            case 'input' :
                return <InputPrice onNext={handleNext}/>;
            case 'check' :
                return <PriceCheck price={price.toString()} />;
            default:
                return <InputPrice onNext={() => setPage('check')}/>;
        }
    }
    return(
        <>
            {renderPage()}
        </>
    )    
}