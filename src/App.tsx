import { ThemeProvider } from "styled-components";
import { vexpensesTheme } from "./styles/theme/theme";
import { SupplierCard } from "@/features/supplier/components/supplier-card";
import { GlobalStyle } from "@/styles/theme/global-style";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useGetSuppliers } from "@/features/supplier/api/get-suppliers";

const queryClient = new QueryClient();

const Test = () => {
  const { data } = useGetSuppliers();

  const firstUser = data?.data[0];

  return (
    <SupplierCard
      id="1"
      address={{
        city: firstUser?.address.city || "",
        code: firstUser?.address.code || "",
        number: firstUser?.address.number || "",
        reference: firstUser?.address.reference || "",
        state: firstUser?.address?.state || "",
        street: firstUser?.address.street || "",
      }}
      contact={firstUser?.contact || []}
      description={firstUser?.description || ""}
      name={firstUser?.name || ""}
    />
  );
};

function App() {
  return (
    <ThemeProvider theme={vexpensesTheme}>
      <QueryClientProvider client={queryClient}>
        <Test />
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
