import { FileUp } from "lucide-react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const StyledAdd = styled(FileUp)`
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
`;

interface AddProps {
  tooltipContent: string;
  id: string;
  onClick: () => void;
}

export const Export = (props: AddProps) => {
  return (
    <>
      <StyledAdd id={props.id} onClick={props.onClick} />
      <Tooltip
        content={props.tooltipContent}
        anchorSelect={`#${props.id}`}
      />
    </>
  );
};
