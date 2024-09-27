import styled from "styled-components";

export const FormFieldsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto);
  gap: 16px;
`;

export const FieldGroupTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const StyledContactWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  padding: 8px;
`;
