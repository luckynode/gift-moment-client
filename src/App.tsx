import './App.css'
import styled, {createGlobalStyle} from 'styled-components'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/home'
import {useEffect} from 'react'
import MyLettersPage from "./pages/MyLettersPage.tsx";
import {ToastContainer} from "react-toastify";
import OAuth from './components/KakaoOauth'
import SignUp from './routes/signup'
import Mywish from './routes/mywish'
import Login from './routes/login.tsx'
import GuestLetters from "./routes/GuestLetters.tsx";
import WriteLetter from "./pages/WriteLetter.tsx";
import LetterSentConfirm from "./routes/LetterSentConfirm.tsx";
import Mypage from './pages/mypage.tsx'
import EditMypage from './pages/mypageEdit.tsx'

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
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
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
        element: <MyLettersPage/>
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
        path: "/guest-letters",
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