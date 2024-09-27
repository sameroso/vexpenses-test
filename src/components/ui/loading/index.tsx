import React from 'react'
import styled, { keyframes } from 'styled-components'

interface LoadingProps {
    size?: number
    color?: string
    thickness?: number
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingWrapper = styled.div<LoadingProps>`
    display: inline-block;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`

const Spinner = styled.div<LoadingProps>`
    width: 100%;
    height: 100%;
    border: ${(props) => props.thickness}px solid
        ${({ theme }) => theme.colors.primary.light};
    border-top: ${(props) => props.thickness}px solid
        ${({ theme }) => theme.colors.primary.main};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`

export const Loading: React.FC<LoadingProps> = ({
    size = 40,
    color = '#007bff',
    thickness = 4,
}) => {
    return (
        <LoadingWrapper size={size} role="status" aria-label="Loading">
            <Spinner size={size} color={color} thickness={thickness} />
        </LoadingWrapper>
    )
}
