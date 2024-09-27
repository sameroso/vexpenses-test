import { SupplierCard } from '@/features/supplier/components/supplier-card'
import { useGetSuppliers } from '@/features/supplier/api/get-suppliers'
import {
    AddIcon,
    ExportIcon,
    InfoBannerMessage,
    InformationBanner,
    Input,
    Loading,
    ReloadIcon,
} from '@/components/ui'
import { useState } from 'react'
import { SupplierDTO } from '@/services/suppliers'
import { downloadCSV } from '@/utils/csv-helpers'
import {
    CardsContainer,
    InfoBannerItemsContainer,
    LoadingContainer,
    TopActionsContainer,
} from './styles'
import { DeleteSupplierModal } from '@/features/supplier/components/delete-supplier-modal'
import { SupplierModalActions } from '@/features/supplier/components/supplier-modal-actions'
import { useForm } from 'react-hook-form'

export const SupplierPage = () => {
    const { data, status, refetch } = useGetSuppliers()

    const [selectedSupplier, setSelectedSupplier] = useState<SupplierDTO>()

    const { watch, register } = useForm<{ searchFilter: '' }>({
        defaultValues: { searchFilter: '' },
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const searchString = watch('searchFilter')

    const filtereSupplierBySearchString = (supplier: SupplierDTO) =>
        supplier.name
            .toLocaleLowerCase()
            .includes(searchString.toLocaleLowerCase())

    return (
        <>
            <Input
                {...register('searchFilter')}
                placeholder="Filtrar por nome"
            />
            <TopActionsContainer>
                <AddIcon
                    id="addSupplier"
                    onClick={() => {
                        setSelectedSupplier(undefined)
                        setIsModalOpen(true)
                    }}
                    tooltipContent="Cadastrar Fornecedor"
                />

                <ExportIcon
                    tooltipContent="Exportar CSV"
                    id="downloadCsv"
                    onClick={() => downloadCSV(data?.data || [{}], 'suppliers')}
                />
            </TopActionsContainer>
            <DeleteSupplierModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                supplier={selectedSupplier}
            />
            <SupplierModalActions
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                supplier={selectedSupplier}
            />

            {status === 'pending' && (
                <LoadingContainer>
                    <Loading size={60} />
                </LoadingContainer>
            )}
            {status === 'error' && (
                <InformationBanner
                    message={
                        <InfoBannerItemsContainer>
                            <ReloadIcon
                                onClick={() => {
                                    refetch()
                                }}
                                tooltipContent="Recarregar"
                                id="reload-suppliers"
                            />
                            <InfoBannerMessage>
                                Não foi possível carregar seus fornecedores, por
                                favor tente novamente
                            </InfoBannerMessage>
                        </InfoBannerItemsContainer>
                    }
                    type="error"
                    title="Erro ao carregar fornecedores"
                />
            )}
            {status === 'success' && !data.data.length && (
                <InformationBanner
                    message="Você ainda não tem fornecedor cadastrado, clique em cadastrar fornecedor para adicionar seu primeiro fornecedor"
                    type="info"
                    title="Você ainda não tem fornecedor cadastrado"
                />
            )}
            {status === 'success' && data.data.length > 0 && (
                <CardsContainer>
                    {(data?.data || [])
                        ?.filter(filtereSupplierBySearchString)
                        .map((supplier) => {
                            return (
                                <div key={supplier.id}>
                                    <SupplierCard
                                        onClickDelete={(supplier) => {
                                            setSelectedSupplier(supplier)
                                            setIsDeleteModalOpen(true)
                                        }}
                                        supplier={supplier}
                                        onClickEdit={(supplier) => {
                                            setSelectedSupplier(supplier)
                                            setIsModalOpen(true)
                                        }}
                                    />
                                </div>
                            )
                        })}
                </CardsContainer>
            )}
        </>
    )
}
