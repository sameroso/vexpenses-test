import { FC, ReactNode } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div<{ maxWidth?: string; padding?: string }>`
    width: 100%;
    max-width: ${(props) => props.maxWidth || '1200px'};
    margin: 0 auto;
    padding: ${(props) => props.padding || '0 15px'};
    box-sizing: border-box;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding: ${(props) => props.padding || '0 10px'};
    }
`

interface ContainerProps {
    children: ReactNode
    maxWidth?: string
    padding?: string
    className?: string
}

export const Container: FC<ContainerProps> = ({
    children,
    maxWidth,
    padding,
    className,
}) => {
    return (
        <StyledContainer
            maxWidth={maxWidth}
            padding={padding}
            className={className}
        >
            {children}
        </StyledContainer>
    )
}
