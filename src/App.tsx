import './App.css'
import styled, {createGlobalStyle} from 'styled-components'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/auth/home.tsx'
import {useEffect} from 'react'
import MyLetters from "./routes/letters/myLetters.tsx";
import {ToastContainer} from "react-toastify";
import OAuth from './components/auth/KakaoOauth.tsx'
import SignUp from './routes/auth/signUp.tsx'
import Mywish from './routes/wish/myWish.tsx'
import Login from './routes/auth/login.tsx'
import GuestLetters from "./pages/letters/guestLetters.tsx";
import WriteLetter from "./routes/letters/writeLetter.tsx";
import LetterSentConfirm from "./routes/letters/letterSentConfirm.tsx";
import Mypage from './routes/auth/myPage.tsx'
import EditMypage from './routes/auth/myPageEdit.tsx'
import WishList from './routes/wish/wishList.tsx'
import UserWishList from './pages/wish/userWishList.tsx'
import GiftAmount from './pages/price/giftAmount.tsx'
import UserWishDetail from './pages/wish/userWishDetail.tsx'
import SendConfirm from './pages/price/sendConfirm.tsx'
import PaymentRequest from "./routes/payment/paymentRequest.tsx";
import PaymentRequestComplete from "./routes/payment/paymentRequestComplete.tsx";
import MyWishDetail from "./pages/wish/myWishDetail.tsx";
import MyWishModify from "./pages/wish/myWishModify.tsx";
import AddWish from "./routes/wish/addWish.tsx";
import AddWishConfirm from "./routes/wish/addWishConfirm.tsx";
import PaymentApprove from './routes/payment/paymentApprove.tsx'

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
        path: "/wishlist/:uniqueString",
        element: <UserWishList/>
    },
    {
        path: "/wishlist/:uniqueString/item/:itemId",
        element: <UserWishDetail/>
    },
    {
        path: "/wishlist/:uniqueString/item/:itemId/send",
        element: <GiftAmount/>
    },
    {
        path: "/wishlist/:uniqueString/item/:itemId/send/confirm",
        element: <SendConfirm/>
    },
    {
        path: "/payments/kakao-pay/success",
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
], {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
    },
});


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
            <RouterProvider router={router} future={{ v7_startTransition : true }}/>
            <ToastContainer/>
        </Wrapper>
    )
}

export default App
