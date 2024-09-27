import { ForwardedRef, forwardRef } from 'react'
import styled from 'styled-components'
import { StyledErrorMessage, StyledLabel } from '../common/components'
import { inputBorder, inputDisabled } from '../common/mixins'

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`

const StyledInput = styled.input`
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;

    ${inputBorder}
    ${inputDisabled}
`

type InputIntrinscElements = JSX.IntrinsicElements['input']

interface InputProps extends InputIntrinscElements {
    label?: string
    errorMessage?: string
}

function InputComponent(
    props: InputProps,
    ref: ForwardedRef<HTMLInputElement>
) {
    const { label, errorMessage, ...rest } = props
    return (
        <InputWrapper>
            <StyledLabel htmlFor="styledInput">
                {label}
                {props.required ? '*' : ''}
            </StyledLabel>
            <StyledInput {...rest} ref={ref} />
            <StyledErrorMessage>{errorMessage || ' '}</StyledErrorMessage>
        </InputWrapper>
    )
}

export const Input = forwardRef(InputComponent)
