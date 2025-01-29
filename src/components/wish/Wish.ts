import styled from "styled-components";

export const WishWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
  padding-top: 70px;
`
// 추가, 수정 페이지를 위한 스타일
export const WishChangeWrapper = styled(WishWrapper)`
  padding-bottom: 70px;
`

export const Subtitle = styled.div`
  font-size: 25px;
  font-family: 'Lato';
  color: transparent;
  display: inline-block;
  background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); 
  background-clip: text;
`
