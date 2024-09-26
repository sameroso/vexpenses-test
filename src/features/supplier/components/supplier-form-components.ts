import styled from "styled-components";

export const FormFieldsContainer = styled.div`
  display: grid;
  width: 100%;
  /* @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
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
  } */
  grid-template-columns: repeat(auto);
  gap: 16px;
`;

export const FieldGroupTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
`;
