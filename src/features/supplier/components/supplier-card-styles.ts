import styled from 'styled-components'

export const ContactContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 16px;
    flex-wrap: wrap;
`

export const HeaderButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
export const InfoFieldLabel = styled.span`
    font-weight: 600;
    display: block;
    color: ${({ theme }) => theme.colors.grey[200]};
`
