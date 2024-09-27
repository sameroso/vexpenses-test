import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    DeleteIcon,
    EditIcon,
} from '@/components/ui'
import { SupplierDTO } from '@/services/suppliers'
import { FieldGroupTitle, FormFieldsContainer } from './supplier-form-styles'
import { states } from '@/constants/brazilian-states'
import {
    ContactContainer,
    HeaderButtonsContainer,
    InfoFieldLabel,
} from './supplier-card-styles'

interface InfoFieldProps {
    label?: string
    value?: string
}
const InfoField = ({ label = '', value = '' }: InfoFieldProps) => {
    return (
        <div>
            <InfoFieldLabel>{label}</InfoFieldLabel>
            <span>{value}</span>
        </div>
    )
}

interface SupplierCardProps {
    supplier?: SupplierDTO
    onClickEdit: (supplier: SupplierDTO) => void
    onClickDelete: (supplier: SupplierDTO) => void
}

export const SupplierCard = (props: SupplierCardProps) => {
    const supplierStateAdress =
        states.find((val) => val.uf === props.supplier?.address.state || '')
            ?.name || ''
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.supplier?.name}</CardTitle>

                <HeaderButtonsContainer>
                    <EditIcon
                        onClick={() => {
                            props.onClickEdit(props.supplier!)
                        }}
                        id="editSuplier"
                        tooltipContent="Editar Fornecedor"
                    />
                    <DeleteIcon
                        onClick={() => {
                            props.onClickDelete(props.supplier!)
                        }}
                        id="deleteSupplier"
                        tooltipContent="Deletar Fornecedor"
                    />
                </HeaderButtonsContainer>
            </CardHeader>
            <CardContent>
                <>
                    <FieldGroupTitle>Informações Pessoais</FieldGroupTitle>
                    <FormFieldsContainer>
                        <InfoField label="Nome" value={props.supplier?.name} />

                        <InfoField
                            label="Descrição"
                            value={props.supplier?.description}
                        />
                    </FormFieldsContainer>
                    <FieldGroupTitle>Endereço</FieldGroupTitle>
                    <FormFieldsContainer>
                        <InfoField
                            label="CEP"
                            value={props.supplier?.address.code}
                        />
                        <InfoField
                            label="Cidade"
                            value={props.supplier?.address.city}
                        />
                        <InfoField
                            label="Número"
                            value={props.supplier?.address.number}
                        />
                        <InfoField
                            label="Logradouro"
                            value={props.supplier?.address.street}
                        />
                        <InfoField label="Estado" value={supplierStateAdress} />
                        <InfoField
                            label="Referência"
                            value={props.supplier?.address.reference}
                        />
                    </FormFieldsContainer>
                    <FieldGroupTitle>Contatos</FieldGroupTitle>
                    <ContactContainer>
                        {props.supplier?.contact.map((contact) => (
                            <div key={contact.phone}>
                                <InfoField
                                    key={contact.phone}
                                    label={contact.name}
                                    value={contact.phone}
                                />
                            </div>
                        ))}
                    </ContactContainer>
                </>
            </CardContent>
        </Card>
    )
}
