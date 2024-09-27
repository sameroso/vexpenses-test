import { MinusCircle } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledMinusIcon = styled(MinusCircle)`
    color: ${({ theme }) => theme.colors.error.main};
    cursor: pointer;
`

interface MinusIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const MinusIcon = (props: MinusIconProps) => {
    return (
        <>
            <StyledMinusIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
