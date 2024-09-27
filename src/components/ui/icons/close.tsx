import { CircleX } from "lucide-react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export const StyledClose = styled(CircleX)`
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
`;

interface CloseProps {
  tooltipContent: string;
  id: string;
  onClick: () => void;
}

export const Close = (props: CloseProps) => {
  return (
    <>
      <StyledClose id={props.id} onClick={props.onClick} />
      <Tooltip content={props.tooltipContent} anchorSelect={`#${props.id}`} />
    </>
  );
};
