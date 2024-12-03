import { useState } from "react"
import GetInfo from "../pages/getInfo";
import AccountInput from "../pages/accountInput";
import AccountCheck from "../pages/accountCheck";

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