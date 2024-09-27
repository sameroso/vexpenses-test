import { Trash2 } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledDeleteIcon = styled(Trash2)`
    color: ${({ theme }) => theme.colors.error.main};
    cursor: pointer;
`

interface DeleteIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const DeleteIcon = (props: DeleteIconProps) => {
    return (
        <>
            <StyledDeleteIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
