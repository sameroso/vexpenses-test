import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.dark};
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[50]};
  }
`;

const StyledErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
`;

type InputIntrinscElements = JSX.IntrinsicElements["input"];

interface InputProps extends InputIntrinscElements {
  label?: string;
  errorMessage?: string;
}

function InputComponent(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { label, errorMessage, ...rest } = props;
  return (
    <InputWrapper>
      <StyledLabel htmlFor="styledInput">{label}</StyledLabel>
      <StyledInput {...rest} ref={ref} />
      <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
    </InputWrapper>
  );
}

export const Input = forwardRef(InputComponent);
