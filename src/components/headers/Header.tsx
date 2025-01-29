import styled from 'styled-components';

type HeaderProps = {
    title: string;
    fontSize?: string;
    hasBorder?: boolean;
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== "hasBorder",
})<{ fontSize: string; hasBorder?: boolean }>`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  color: transparent; 
  margin: 0;
  border-bottom: 4px solid #B72F54; 
  display: inline-block;
  text-align: center;
  background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); 
  background-clip: text; 

  /* 밑줄 조건부 스타일링 */
  border-bottom: ${(props) => (props.hasBorder ? '4px solid #B72F54' : 'none')};
  white-space: pre-line; 
`;

const Header = ({ title, fontSize = "30px", hasBorder = false }: HeaderProps) => {
    return (
        <HeaderContainer>
            <HeaderTitle fontSize={fontSize} hasBorder={hasBorder}>{title}</HeaderTitle>
        </HeaderContainer>
    );
};

export default Header;
