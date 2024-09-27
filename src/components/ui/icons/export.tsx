import { FileUp } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

export const StyledExport = styled(FileUp)`
    color: ${({ theme }) => theme.colors.primary.dark};
    cursor: pointer;
`

interface ExportProps {
    tooltipContent: string
    id: string
    onClick: () => void
}

export const Export = (props: ExportProps) => {
    return (
        <>
            <StyledExport id={props.id} onClick={props.onClick} />
            <Tooltip
                content={props.tooltipContent}
                anchorSelect={`#${props.id}`}
            />
        </>
    )
}
