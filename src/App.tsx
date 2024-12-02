import './App.css'
import styled, { createGlobalStyle } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home'
import { useEffect } from 'react'
import OAuth from './components/KakaoOauth'

const GlobalStyles = createGlobalStyle`
body {
    margin: 0;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
  }
  :root {
       --vh: 100%;
   }
`
const Wrapper = styled.div`
  max-width: 390px;
  margin-left: auto;
  margin-right: auto;
  background-color: #FFECEC;
  display: flex;
  align-items: center;
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