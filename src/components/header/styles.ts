import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => {
    return theme.colors.primary.dark;
  }};
  margin-bottom: 32px;
  padding: 16px;
`;

export const HeaderText = styled.h2`
  color: ${({ theme }) => theme.colors.primary.contrastText};
`;
