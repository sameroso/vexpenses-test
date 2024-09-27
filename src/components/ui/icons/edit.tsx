import { Pencil } from "lucide-react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const StyledEdit = styled(Pencil)`
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
`;

interface EditProps {
  tooltipContent: string;
  id: string;
  onClick: () => void;
}

export const Edit = (props: EditProps) => {
  return (
    <>
      <StyledEdit id={props.id} onClick={props.onClick} />
      <Tooltip content={props.tooltipContent} anchorSelect={`#${props.id}`} />
    </>
  );
};
