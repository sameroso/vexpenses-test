import styled from "styled-components";

export const CardsContainer = styled.div`
  display: grid;
  width: 100%;
  height: 75vh;
  padding: 16px;
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
  gap: 16px;
`;

export const TopActionsContainer = styled.div`
  display: flex;
  justify-content: end;
  padding: 16px;
  gap: 8px;
`;
