import { DefaultTheme } from "styled-components";

const vexpensesTheme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    grey: { "50": "#f9f9f9f9", "100": "#efefef", "200": "#666666" },
    primary: {
      dark: "#003b75",
      light: "#4ac0ff",
      main: "#0082f5",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
    },
  },
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
  },
};

export { vexpensesTheme };
