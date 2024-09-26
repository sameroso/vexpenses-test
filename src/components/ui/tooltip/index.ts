import { Tooltip as ReactTooltip } from "react-tooltip";
import styled from "styled-components";

export const Tooltip = styled(ReactTooltip)`
  background-color: ${({ theme }) => theme.colors.primary.dark};
  color: ${({ theme }) => theme.colors.primary};
`;
