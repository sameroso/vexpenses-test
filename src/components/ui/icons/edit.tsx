import { Pencil } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledEditIcon = styled(Pencil)`
    color: ${({ theme }) => theme.colors.primary.dark};
    cursor: pointer;
`

interface EditIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const EditIcon = (props: EditIconProps) => {
    return (
        <>
            <StyledEditIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
