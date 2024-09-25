import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.dark};
  color: ${({ theme }) => theme.colors.primary.contrastText};
`;
