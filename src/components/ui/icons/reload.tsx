import { RotateCcw } from "lucide-react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

const StyledRotate = styled(RotateCcw)`
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
`;

interface ReloadProps {
  tooltipContent: string;
  id: string;
  onClick: () => void;
}

export const Reload = (props: ReloadProps) => {
  return (
    <>
      <StyledRotate id={props.id} onClick={props.onClick} />
      <Tooltip content={props.tooltipContent} anchorSelect={`#${props.id}`} />
    </>
  );
};
