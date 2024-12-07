import styled from 'styled-components';

type HeaderProps = {
    title: string;
    fontSize?: string;
    hasBorder?: boolean; // underline 표시 여부
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.h1<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  color: transparent; /* 텍스트 색상을 투명으로 설정 */
  margin: 0;
  border-bottom: 4px solid #B72F54; /* 글씨 크기만큼 밑줄 */
  display: inline-block;
  text-align: center;
  /* 글자 내부 색상 변화 */
  background: linear-gradient(to bottom, #924C57 0%, #B62F45 30%, #B72F54 60%, #924C57 100%); /* 중앙만 살짝 연하게 */
  background-clip: text; /* 텍스트에 배경 적용 */

  /* 밑줄 조건부 스타일링 */
  border-bottom: ${(props) => (props.hasBorder ? '4px solid #B72F54' : 'none')};
  white-space: pre-line; /* \\n 처리를 위한 속성 */
`;

const Header = ({ title, fontSize = '30px', hasBorder = false }: HeaderProps) => {
    return (
        <HeaderContainer>
            <HeaderTitle fontSize={fontSize} hasBorder={hasBorder}>{title}</HeaderTitle>
        </HeaderContainer>
    );
};

export default Header;
