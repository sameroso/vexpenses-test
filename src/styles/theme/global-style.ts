import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{ 
    min-height: 100vh; 
    background-color: ${({theme})=>theme.colors.grey[100]};
    margin:0;
    };
  main {height: 100%}
  * { 
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
`;
