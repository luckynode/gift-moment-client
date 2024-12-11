import { useState } from "react";
import InputPrice from "./InputPrice";
import PriceCheck from "./PriceCheck";

export default function GiftAmount() {
    const [page, setPage] = useState('input');

    const renderPage = () => {
        switch (page) {
            case 'input' :
                return <InputPrice onNext={() => setPage('check')}/>;
            case 'check' :
                return <PriceCheck />;
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