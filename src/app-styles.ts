import styled from "styled-components";

export const Container = styled.div<{ maxWidth: string; padding: string }>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || "1200px"};
  margin: 0 auto;
  padding: ${(props) => props.padding || "0 15px"};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${(props) => props.padding || "0 10px"};
  }
`;
