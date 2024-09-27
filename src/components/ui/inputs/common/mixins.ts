import { css } from 'styled-components'

export const inputBorder = css`
    border: 2px solid ${({ theme }) => theme.colors.primary.dark};
    &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
    }
`

export const inputDisabled = css`
    &:disabled {
        background-color: ${({ theme }) => theme.colors.grey[100]};
    }
    cursor: auto;
    opacity: 70%;
`
