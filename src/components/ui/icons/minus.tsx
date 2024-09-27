import { MinusCircle } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledMinus = styled(MinusCircle)`
    color: ${({ theme }) => theme.colors.error.main};
    cursor: pointer;
`

interface MinusProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const Minus = (props: MinusProps) => {
    return (
        <>
            <StyledMinus id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
