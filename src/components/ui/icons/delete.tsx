import { Trash2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const StyledDelete = styled(Trash2)`
  color: ${({ theme }) => theme.colors.error.main};
  cursor: pointer;
`;

interface DeleteProps {
  tooltipContent: string;
  id: string;
  onClick: () => void;
}

export const Delete = (props: DeleteProps) => {
  return (
    <>
      <StyledDelete id={props.id} onClick={props.onClick} />
      <Tooltip content={props.tooltipContent} anchorSelect={`#${props.id}`} />
    </>
  );
};
