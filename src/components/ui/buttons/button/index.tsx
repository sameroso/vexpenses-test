import styled from 'styled-components'

export const TextButton = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.colors.primary.dark};

    &:disabled {
        opacity: 0.65;
        cursor: auto;
    }
`

export const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.primary.dark};
    color: ${({ theme }) => theme.colors.primary.contrastText};
    cursor: pointer;
    padding: 8px 8px;
    border-radius: 4px;
    border: 1px solid transparent;
    &:disabled {
        opacity: 0.65;
        cursor: auto;
    }
`
