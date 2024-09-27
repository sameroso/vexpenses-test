import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.dark};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  cursor: pointer;
  padding: 8px 8px;
  border-radius: 4px;
  border: 1px solid transparent;
`;
