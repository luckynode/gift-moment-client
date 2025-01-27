import './App.css'
import styled, {createGlobalStyle} from 'styled-components'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/home.tsx'
import {useEffect} from 'react'
import MyLetters from "./routes/myLetters.tsx";
import {ToastContainer} from "react-toastify";
import OAuth from './components/oauth/KakaoOauth.tsx'
import SignUp from './routes/signUp.tsx'
import Mywish from './routes/myWish.tsx'
import Login from './routes/login.tsx'
import GuestLetters from "./routes/guestLetters.tsx";
import WriteLetter from "./routes/writeLetter.tsx";
import LetterSentConfirm from "./routes/letterSentConfirm.tsx";
import Mypage from './pages/myPage.tsx'
import EditMypage from './pages/myPageEdit.tsx'
import WishList from './routes/wishList.tsx'
import UserWishList from './routes/userWishList.tsx'
import GiftAmount from './pages/price/giftAmount.tsx'
import UserWishDetail from './pages/userWishDetail.tsx'
import SendConfirm from './pages/price/sendConfirm.tsx'
import PaymentRequest from "./routes/paymentRequest.tsx";
import PaymentRequestComplete from "./routes/paymentRequestComplete.tsx";
import MyWishDetail from "./pages/myWishDetail.tsx";
import MyWishModify from "./pages/myWishModify.tsx";
import AddWish from "./routes/addWish.tsx";
import AddWishConfirm from "./routes/addWishConfirm.tsx";
import PaymentApprove from './pages/price/paymentApprove.tsx'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    font-family: 'Pretendard', sans-serif;
  }

  button {
    font-family: 'Pretendard', sans-serif;
  }

  input, textarea {
    font-family: 'Lato', sans-serif;
  }

  :root {
    --vh: 100%;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-track {
    background: #FFE6F0; /* 트랙 배경 */
    border-radius: 10px; /* 둥근 모서리 */
  }

  ::-webkit-scrollbar-thumb {
    background: #FF99CC; /* 스크롤바 색상 */
    border-radius: 10px; /* 둥근 모서리 */
    height: 5px; /* 스크롤바 최소 길이 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FF6699; /* 호버 시 색상 */
  }
`
const Wrapper = styled.div`
  min-width: 390px;
  margin-left: auto;
  margin-right: auto;
  background-color: #FFECEC;
  display: flex;
  justify-content: center;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  font-family: 'Pretendard', sans-serif;
`

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/oauth/kakao",
        element: <OAuth/>
    },
    {
        path: "/my-letters",
        element: <MyLetters/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/mywish",
        element: <Mywish/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/gm-letter/:uniqueString",
        element: <GuestLetters/>
    },
    {
        path: "/write-letter",
        element: <WriteLetter/>
    },
    {
        path: "/letter-sent-confirm",
        element: <LetterSentConfirm/>
    },
    {
        path: "/mypage",
        element: <Mypage/>
    },
    {
        path: "/mypage/edit",
        element: <EditMypage/>
    },
    {
        path: "/wishlist",
        element: <WishList/>
    },
    {
        path: "/wishlist/:userId",
        element: <UserWishList/>
    },
    {
        path: "/wishlist/:userId/item/:itemId",
        element: <UserWishDetail/>
    },
    {
        path: "/wishlist/:userId/item/:itemId/send",
        element: <GiftAmount/>
    },
    {
        path: "/wishlist/:userId/item/:itemId/send/confirm",
        element: <SendConfirm/>
    },
    {
        path: "/payment-approval",
        element: <PaymentApprove />
    },
    {
        path: "/payment-request",
        element: <PaymentRequest/>
    },
    {
        path: "/payment-request-complete",
        element: <PaymentRequestComplete/>
    },
    {
        path: "/wishlist/item/:itemId",
        element: <MyWishDetail/>
    },
    {
        path: "/wishlist/item/:itemId/modify",
        element: <MyWishModify/>
    },
    {
        path: "/wishlist/add",
        element: <AddWish/>
    },
    {
        path: "/wishlist/add/confirm",
        element: <AddWishConfirm/>
    }
])


function App() {
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);

        return () => {
            window.removeEventListener('resize', setScreenSize);
        };
    }, []);

    return (
        <Wrapper className='store'>
            <GlobalStyles/>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </Wrapper>
    )
}

export default App
