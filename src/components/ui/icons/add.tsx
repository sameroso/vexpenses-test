import { CirclePlus } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledAddIcon = styled(CirclePlus)`
    color: ${({ theme }) => theme.colors.primary.dark};
    cursor: pointer;
`

interface AddIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const AddIcon = (props: AddIconProps) => {
    return (
        <>
            <StyledAddIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
