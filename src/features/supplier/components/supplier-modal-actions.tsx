import {
    Button,
    Close,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    TextButton,
} from '@/components/ui'
import { SupplierForm, SupplierFormFields } from './supplier-form'
import { SupplierDTO } from '@/services/suppliers'
import { useEditSupplier } from '../api/edit-supplier'
import { useCreateSupplier } from '../api/create-supplier'
import { toast } from 'react-toastify'
import { FormActionButtonsContainer } from './supplier-modal-actions-styles'

interface EditModalProps {
    isOpen: boolean
    supplier?: SupplierDTO
    onClose: () => void
    onSuccessSubmit?: () => void
}

export const SupplierModalActions = (props: EditModalProps) => {
    const createSupplierMutation = useCreateSupplier()
    const editSupplierMutation = useEditSupplier()

    const isEditingSupplier = props.supplier

    const createSupplier = async (data: SupplierFormFields) => {
        try {
            await createSupplierMutation.mutateAsync(data)
            toast.success('Fornecedor cadastrado com sucesso!')
            props.onClose()
            props.onSuccessSubmit?.()
        } catch {
            toast.error(
                'Não foi possível cadastrado o fornecedor, Pro Favor tente novamente mais tarde'
            )
        }
    }

    const editSupplier = async (data: SupplierFormFields) => {
        try {
            await editSupplierMutation.mutateAsync({
                id: props.supplier!.id,
                supplier: { ...data, id: props.supplier!.id },
            })
            props.onClose()
            props.onSuccessSubmit?.()
            toast.success('Fornecedor editado com sucesso!')
        } catch {
            toast.error(
                'Não foi possível editar o fornecedor, por favor tente novamente mais tarde'
            )
        }
    }

    const handleSubmitForm = async (data: SupplierFormFields) => {
        if (!isEditingSupplier) {
            createSupplier(data)
        } else {
            editSupplier(data)
        }
    }

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>
                <ModalTitle>
                    {isEditingSupplier
                        ? 'Editar Fornecedor'
                        : 'Cadastrar Fornecedor'}
                </ModalTitle>
                <Close
                    onClick={props.onClose}
                    id="closeEditSupplierModal"
                    tooltipContent="Fechar"
                />
            </ModalHeader>
            <ModalBody>
                <SupplierForm formFields={props.supplier}>
                    {({ handleSubmit }) => {
                        return (
                            <FormActionButtonsContainer>
                                <TextButton onClick={props.onClose}>
                                    cancelar
                                </TextButton>
                                <Button
                                    type="button"
                                    onClick={handleSubmit(handleSubmitForm)}
                                >
                                    {createSupplierMutation.status === 'pending'
                                        ? 'Salvando'
                                        : 'Salvar'}
                                </Button>
                            </FormActionButtonsContainer>
                        )
                    }}
                </SupplierForm>
            </ModalBody>
        </Modal>
    )
}
