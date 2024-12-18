import { useState } from "react"
import GetInfo from "../pages/signup/GetInfo";
import AccountInput from "../pages/signup/AccountInput";
import AccountCheck from "../pages/signup/AccountCheck";

export default function SignUp() {
    const [page, setPage] = useState('getinfo');

    const renderPage = () => {
        switch (page) {
            case 'getinfo' :
                return <GetInfo onNext={() => setPage('account')}/>;
            case 'account' :
                return <AccountInput onNext={() => setPage('check')}/>;
            case 'check' :
                return <AccountCheck />;
            default:
                return <GetInfo onNext={() => ''}/>
        }
    }
    return(
        <>
            {renderPage()}
        </>
    )    
}