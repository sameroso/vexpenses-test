import { CircleX } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledCloseIcon = styled(CircleX)`
    color: ${({ theme }) => theme.colors.primary.dark};
    cursor: pointer;
`

interface CloseIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const CloseIcon = (props: CloseIconProps) => {
    return (
        <>
            <StyledCloseIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
