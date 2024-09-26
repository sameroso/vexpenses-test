import { ThemeProvider } from "styled-components";
import { vexpensesTheme } from "@/styles/theme/theme";
import { GlobalStyle } from "@/styles/theme/global-style";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Container } from "@/components/ui";
import { Supplier } from "@/pages/supplier";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={vexpensesTheme}>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Supplier />
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
