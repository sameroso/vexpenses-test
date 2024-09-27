import { ThemeProvider } from 'styled-components'
import { vexpensesTheme } from '@/styles/theme/theme'
import { GlobalStyle } from '@/styles/theme/global-style'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Container } from '@/components/ui'
import { SupplierPage } from '@/pages/suppliers/supplier'
import { Header } from './components/header'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

function App() {
    return (
        <ThemeProvider theme={vexpensesTheme}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <Header />
                <Container>
                    <SupplierPage />
                </Container>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyle />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
