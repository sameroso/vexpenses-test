import styled from "styled-components";

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.grey[50]};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 100%;
  height: 100%;
`;

const CardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-top: 0;
  margin-bottom: 0;
`;

const CardContent = styled.div`
  
`;

export { CardTitle, CardContent, Card };
