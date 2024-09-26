import { type ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import { StyledErrorMessage, StyledLabel } from "../common/components";
import { inputBorder, inputDisabled } from "../common/mixins";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 35px 6px 10px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  transition: border-color 0.3s ease;

  ${inputBorder}
  ${inputDisabled}
`;

const StyledOption = styled.option`
  padding: 10px;
`;

type SelectIntrinsicElements = JSX.IntrinsicElements["select"];

interface SelectProps extends SelectIntrinsicElements {
  options: {
    label: string;
    value: string;
  }[];
  label?: string;
  errorMessage?: string;
}

function SelectComponent(
  props: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const { options, errorMessage, label, ...rest } = props;
  return (
    <>
      <SelectWrapper>
        <StyledLabel>{label}</StyledLabel>
        <div>
          <StyledSelect {...rest} aria-label="Selecione uma opção" ref={ref}>
            <StyledOption value="" disabled>
              Selecione uma opção
            </StyledOption>
            {options.map((opt) => {
              return (
                <StyledOption key={opt.value} value={opt.value}>
                  {opt.label}
                </StyledOption>
              );
            })}
          </StyledSelect>
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        </div>
      </SelectWrapper>
    </>
  );
}

export const Select = forwardRef(SelectComponent);
