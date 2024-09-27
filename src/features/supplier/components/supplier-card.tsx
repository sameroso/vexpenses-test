import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { SupplierDTO } from '@/services/suppliers'
import { FieldGroupTitle, FormFieldsContainer } from './supplier-form-styles'
import { states } from '@/utils/brazilian-states'
import { Delete } from '@/components/ui/icons/delete'
import { Edit } from '@/components/ui/icons/edit'
import {
    ContactContainer,
    HeaderButtonsContainer,
} from './supplier-card-styles'

export const SupplierCard = (props: {
    supplier?: SupplierDTO
    onClickEdit: (supplier: SupplierDTO) => void
    onClickDelete: (supplier: SupplierDTO) => void
}) => {
    const supplierStateAdress =
        states.find((val) => val.uf === props.supplier?.address.state || '')
            ?.name || ''
    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.supplier?.name}</CardTitle>

                <HeaderButtonsContainer>
                    <Edit
                        onClick={() => {
                            props.onClickEdit(props.supplier!)
                        }}
                        id="editSuplier"
                        tooltipContent="Editar Fornecedor"
                    />
                    <Delete
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
                        <div>
                            <div>Nome</div>
                            <div>{props.supplier?.name}</div>
                        </div>
                        <div>
                            <div>Descrição</div>
                            <div>{props.supplier?.description}</div>
                        </div>
                    </FormFieldsContainer>
                    <FieldGroupTitle>Endereço</FieldGroupTitle>
                    <FormFieldsContainer>
                        <div>
                            <div>CEP</div>
                            <div>{props.supplier?.address.code}</div>
                        </div>
                        <div>
                            <div>Cidade</div>
                            <div>{props.supplier?.address.city}</div>
                        </div>
                        <div>
                            <div>Número</div>
                            <div>{props.supplier?.address.number}</div>
                        </div>
                        <div>
                            <div>Logradouro</div>
                            <div>{props.supplier?.address.street}</div>
                        </div>
                        <div>
                            <div>Estado</div>
                            <div>{supplierStateAdress}</div>
                        </div>
                        <div>
                            <div>Referência</div>
                            <div>{props.supplier?.address.reference}</div>
                        </div>
                    </FormFieldsContainer>
                    <FieldGroupTitle>Contatos</FieldGroupTitle>

                    <ContactContainer>
                        {props.supplier?.contact.map((contact) => (
                            <div key={contact.phone}>
                                <div>
                                    <div>{contact.name}</div>
                                </div>
                                <div>
                                    <div>{contact.phone}</div>
                                </div>
                            </div>
                        ))}
                    </ContactContainer>
                </>
            </CardContent>
        </Card>
    )
}
