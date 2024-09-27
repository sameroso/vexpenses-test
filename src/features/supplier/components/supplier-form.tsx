import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SupplierDTO } from '@/services/suppliers'
import { ReactNode } from 'react'
import { Input, MinusIcon, Select } from '@/components/ui'
import { useGetAddressByCep } from '@/features/common/adress/api/get-adress-by-cep'
import {
    FieldGroupTitle,
    FormFieldsContainer,
    ContactWrapper,
    RemoveContactWrapperButton,
    AddContactButton,
} from './supplier-form-styles'
import { states } from '@/utils/brazilian-states'
import { cepMask, phoneMask } from '@/utils/masks'

const ONLY_LETTERS_AND_SPACES = /^[a-zA-Z\s]+$/
const ONLY_NUMERIC_CHARS = /^[0-9]+$/

const schema = yup
    .object({
        name: yup.string().required('Este campo é obrigatório'),
        description: yup.string(),
        contact: yup
            .array()
            .of(
                yup.object({
                    name: yup.string().required('Este campo é obrigatório'),
                    phone: yup
                        .string()
                        .required('Este campo é obrigatório')
                        .min(15, 'Telefone Inválido'),
                })
            )
            .required(),
        address: yup
            .object({
                code: yup
                    .string()
                    .required('Este campo é obrigatório')
                    .min(9, 'CEP inválido'),
                state: yup.string().required('Este campo é obrigatório').min(2),
                city: yup
                    .string()
                    .required('Este campo é obrigatório')
                    .matches(
                        ONLY_LETTERS_AND_SPACES,
                        'Este campo deve conter apenas letras'
                    ),
                street: yup.string().required('Este campo é obrigatório'),
                number: yup
                    .string()
                    .required('Este campo é obrigatório')
                    .matches(
                        ONLY_NUMERIC_CHARS,
                        'Este campo deve conter apenas valores numéricos'
                    ),
                reference: yup.string(),
            })
            .required(),
    })
    .required()

export type SupplierFormFields = Omit<SupplierDTO, 'id'>

export interface SupplierFormProps {
    formFields?: SupplierFormFields
    children?: (props: UseFormReturn<SupplierFormFields>) => ReactNode
}

export function SupplierForm(props: SupplierFormProps) {
    const formArgs = useForm<SupplierFormFields>({
        mode: 'all',
        defaultValues: {
            ...props.formFields,
            contact: props?.formFields?.contact.length
                ? props.formFields.contact
                : [{ name: '', phone: '' }],
            address: {
                ...props.formFields?.address,
                state: props.formFields?.address.state || '',
            },
        },
        resolver: yupResolver(schema),
    })

    const {
        register,
        control,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = formArgs

    const cep = watch('address.code') || ''

    useGetAddressByCep({
        cep: cep.replace('-', ''),
        queryConfig: { enabled: cep.length === 9 },

        onSuccess: (res) => {
            if ('erro' in res.data) {
                setError('address.code', {
                    message:
                        'CEP não encontrado, por favor tente com outro CEP',
                })
                return
            }

            setValue('address.city', res.data.localidade)
            setValue('address.state', res.data.uf)
            setValue('address.street', res.data.logradouro)
        },
        onError: () => {
            setError('address.code', {
                message: 'Falha ao carregar cep, por favor tente novamente',
            })
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: control,
        name: 'contact',
        rules: { minLength: 1 },
    })

    return (
        <form>
            <FieldGroupTitle>Informações Pessoais</FieldGroupTitle>
            <FormFieldsContainer>
                <Input
                    {...register('name')}
                    label="Nome"
                    errorMessage={errors.name?.message}
                    autoComplete="off"
                    required
                />

                <Input
                    {...register('description')}
                    label="Descrição"
                    errorMessage={errors.description?.message}
                    autoComplete="off"
                />
            </FormFieldsContainer>

            <FieldGroupTitle>Endereço</FieldGroupTitle>
            <FormFieldsContainer>
                <Input
                    {...register('address.code')}
                    label="CEP"
                    required
                    errorMessage={errors.address?.code?.message}
                    autoComplete="off"
                    maxLength={9}
                    onChange={(e) => {
                        register('address.code').onChange(e)
                        setValue('address.code', cepMask(e.target.value))
                    }}
                />

                <Input
                    {...register('address.city')}
                    label="Cidade"
                    required
                    disabled
                    errorMessage={errors.address?.city?.message}
                    autoComplete="off"
                />

                <Input
                    {...register('address.number')}
                    label="Número"
                    required
                    errorMessage={errors.address?.number?.message}
                    autoComplete="off"
                />

                <Input
                    {...register('address.street')}
                    label="Logradouro"
                    required
                    disabled
                    errorMessage={errors.address?.street?.message}
                    autoComplete="off"
                />

                <Select
                    {...register('address.state')}
                    disabled
                    options={states.map((state) => ({
                        label: state.name,
                        value: state.uf,
                    }))}
                    label="Estado"
                    required
                    errorMessage={errors.address?.state?.message}
                    autoComplete="off"
                />

                <Input
                    {...register('address.reference')}
                    label="Referência"
                    autoComplete="off"
                    errorMessage={errors.address?.reference?.message}
                />
            </FormFieldsContainer>

            <FieldGroupTitle>Contatos</FieldGroupTitle>
            <FormFieldsContainer>
                {fields.map((contact, index) => {
                    return (
                        <ContactWrapper key={contact.phone + index}>
                            <RemoveContactWrapperButton>
                                <MinusIcon
                                    tooltipContent="Remover contato"
                                    id={`removeContact${index}`}
                                    onClick={() => {
                                        remove(index)
                                    }}
                                />
                            </RemoveContactWrapperButton>
                            <Input
                                label="Nome"
                                required
                                autoComplete="off"
                                {...register(`contact.${index}.name` as const)}
                                errorMessage={
                                    errors?.contact?.[index]?.name?.message
                                }
                            />
                            <Input
                                label="Telefone"
                                required
                                maxLength={15}
                                {...register(`contact.${index}.phone` as const)}
                                onChange={(e) => {
                                    register(
                                        `contact.${index}.phone` as const
                                    ).onChange(e)
                                    setValue(
                                        `contact.${index}.phone` as const,
                                        phoneMask(e.target.value)
                                    )
                                }}
                                autoComplete="off"
                                errorMessage={
                                    errors?.contact?.[index]?.phone?.message
                                }
                            />
                        </ContactWrapper>
                    )
                })}
            </FormFieldsContainer>

            <AddContactButton
                type="button"
                onClick={() => {
                    append({ name: '', phone: '' })
                }}
            >
                Adicionar contato
            </AddContactButton>

            {props.children?.(formArgs)}
        </form>
    )
}
