import { SupplierDTO } from '@/services/suppliers'
import {
    Button,
    CloseIcon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    TextButton,
} from '@/components/ui'
import { toast } from 'react-toastify'
import { useRemoveSupplier } from '../api/remove-suppliers'
import { ModalFooterActionsContainer } from './delete-supplier-modal-styles'

interface DeleteModalProps {
    isOpen: boolean
    supplier?: SupplierDTO
    onClose: () => void
    onSuccessSubmit?: () => void
}
export const DeleteSupplierModal = (props: DeleteModalProps) => {
    const removeSupplierMutation = useRemoveSupplier()
    const removeSupplier = async () => {
        try {
            await removeSupplierMutation.mutateAsync(props.supplier?.id || '')
            toast.success(
                `O Fornecedor ${props.supplier?.name} foi removido com successo!`
            )
            props.onClose()
            props.onSuccessSubmit?.()
        } catch {
            toast.error(
                `Não foi possível remover o fornecedor ${props.supplier?.name}. Por favor tente mais tarde`
            )
        }
    }
    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>
                <ModalTitle>Remover Fornecedor</ModalTitle>
                <CloseIcon
                    id="closeDeleteModal"
                    onClick={props.onClose}
                    tooltipContent="fechar"
                />
            </ModalHeader>
            <ModalBody>
                <p>Deseja remover o fornecedor {props.supplier?.name}?</p>
            </ModalBody>
            <ModalFooter>
                <ModalFooterActionsContainer>
                    <TextButton onClick={props.onClose}>cancelar</TextButton>
                    <Button type="button" onClick={removeSupplier}>
                        {removeSupplierMutation.status === 'pending'
                            ? 'removendo...'
                            : 'remover'}
                    </Button>
                </ModalFooterActionsContainer>
            </ModalFooter>
        </Modal>
    )
}
