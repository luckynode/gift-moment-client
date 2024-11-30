import React from 'react';
import styled from 'styled-components';

type HeaderProps = {
    title: string;
    fontSize?: string;
    hasBorder?: boolean; // underline 표시 여부
};

const HeaderContainer = styled.header<{ hasBorder: boolean }>`
  width: 100%;
  border-bottom: ${(props) => (props.hasBorder ? '4px solid #B6001E' : 'none')};
`;

const HeaderTitle = styled.h1<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  color: #B6001E;
  margin: 0;
`;

const Header = ({ title, fontSize = '30px', hasBorder = false }: HeaderProps) => {
    return (
        <HeaderContainer hasBorder={hasBorder}>
            <HeaderTitle fontSize={fontSize}>{title}</HeaderTitle>
        </HeaderContainer>
    );
};

export default Header;
