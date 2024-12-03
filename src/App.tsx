import './App.css'
import styled, { createGlobalStyle } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home'
import { useEffect } from 'react'
import OAuth from './components/KakaoOauth'
import SignUp from './routes/signup'

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
  input{
    font-family: 'Lato', sans-serif;
  }
  :root {
       --vh: 100%;
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
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/oauth/kakao",
    element: <OAuth />
  },
  {
    path: "/signup",
    element: <SignUp />
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
    <Wrapper className = 'store'>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App