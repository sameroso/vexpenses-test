import styled from 'styled-components'

export const StyledLabel = styled.label`
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary.dark};
    display: block;
`

export const StyledErrorMessage = styled.span`
    color: ${({ theme }) => theme.colors.error.main};
`
