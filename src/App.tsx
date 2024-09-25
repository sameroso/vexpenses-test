import { ThemeProvider } from "styled-components";
import { vexpensesTheme } from "./styles/theme/theme";
import { SupplierCard } from "@/features/supplier/components/supplier-card";
import { GlobalStyle } from "@/styles/theme/global-style";

function App() {
  return (
    <ThemeProvider theme={vexpensesTheme}>
      <GlobalStyle />
      <SupplierCard />
    </ThemeProvider>
  );
}

export default App;
