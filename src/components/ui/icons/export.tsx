import { FileUp } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledExportIcon = styled(FileUp)`
    color: ${({ theme }) => theme.colors.primary.dark};
    cursor: pointer;
`

interface ExportIconProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const ExportIcon = (props: ExportIconProps) => {
    return (
        <>
            <StyledExportIcon id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
