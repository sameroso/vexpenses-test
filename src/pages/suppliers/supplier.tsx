import { SupplierCard } from '@/features/supplier/components/supplier-card'
import { useGetSuppliers } from '@/features/supplier/api/get-suppliers'
import {
    Add,
    Export,
    InfoBannerMessage,
    InformationBanner,
    Loading,
    Reload,
} from '@/components/ui'
import { useState } from 'react'
import { SupplierDTO } from '@/services/suppliers'
import { downloadCSV } from '@/utils/csv-helpers'
import { CardsContainer, TopActionsContainer } from './styles'
import { DeleteSupplierModal } from '@/features/supplier/components/delete-supplier-modal'
import { SupplierModalActions } from '@/features/supplier/components/supplier-modal-actions'

export const SupplierPage = () => {
    const { data, status, refetch } = useGetSuppliers()

    const [selectedSupplier, setSelectedSupplier] = useState<SupplierDTO>()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    return (
        <>
            <TopActionsContainer>
                <Add
                    id="addSupplier"
                    onClick={() => {
                        setSelectedSupplier(undefined)
                        setIsModalOpen(true)
                    }}
                    tooltipContent="Cadastrar Fornecedor"
                />

                <Export
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loading size={60} />
                </div>
            )}
            {status === 'error' && (
                <InformationBanner
                    message={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <Reload
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
                        </div>
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
                    {data?.data.map((supplier) => {
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
