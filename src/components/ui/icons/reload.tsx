import { RotateCcw } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

const StyledReloadIcon = styled(RotateCcw)`
    color: ${({ theme }) => theme.colors.primary.dark};
    cursor: pointer;
`

interface ReloadIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const ReloadIcon = (props: ReloadIconProps) => {
    return (
        <>
            <StyledReloadIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
