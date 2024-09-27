import { DefaultTheme } from 'styled-components'

const vexpensesTheme: DefaultTheme = {
    borderRadius: '5px',
    colors: {
        grey: { '50': '#f9f9f9f9', '100': '#efefef', '200': '#666666' },
        primary: {
            dark: '#003b75',
            light: '#4ac0ff',
            main: '#0082f5',
            contrastText: '#ffffff',
        },
        error: {
            main: '#DC2626',
            dark: '#991B1B',
            light: '#FEE2E2',
        },
        warning: {
            dark: '#92400E',
            light: '#FEF3C7',
            main: '#D97706',
        },
        info: { dark: '#075985', light: '#E0F2FE', main: '#0284C7' },
        success: { dark: '#065F46', light: '#D1FAE5', main: '#059669' },
    },
    breakpoints: {
        xs: '0px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px',
    },
}

export { vexpensesTheme }
