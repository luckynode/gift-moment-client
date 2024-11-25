import './App.css'
import styled, { createGlobalStyle } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home'

const GlobalStyles = createGlobalStyle`
body {
    margin: 0;
    background-color: #f2f2f2;
  }
`
const Wrapper = styled.div`
  max-width: 390px;
  margin-left: auto;
  margin-right: auto;
  background-color: #FFECEC;
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])


function App() {
  return (
    <Wrapper className = 'store'>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App