import { SupplierCard } from "@/features/supplier/components/supplier-card";
import { useGetSuppliers } from "@/features/supplier/api/get-suppliers";
import { SupplierForm } from "@/features/supplier/components/supplier-form";
import { useCreateSupplier } from "@/features/supplier/api/create-supplier";
import { Button, Modal, ModalBody, ModalHeader } from "@/components/ui";
import { useState } from "react";
import styled from "styled-components";
import { Supplier } from "@/services/suppliers";
import { useEditSupplier } from "@/features/supplier/api/edit-supplier";
import { useRemoveSupplier } from "@/features/supplier/api/remove-suppliers";
// import { useRemoveSupplier } from "@/features/supplier/api/remove-suppliers";

export const FormFieldsContainer = styled.div`
  display: grid;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.xs}) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
  gap: 16px;
`;

export const SupplierPage = () => {
  const { data } = useGetSuppliers();

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const createSupplierMutation = useCreateSupplier();
  const editSupplierMutation = useEditSupplier();
  const removeSupplierMutation = useRemoveSupplier();
  return (
    <>
      <Button
        onClick={() => {
          setSelectedSupplier(undefined);
          setIsModalOpen(true);
        }}
      >
        Adicionar Fornecedor
      </Button>
      <Modal isOpen={isDeleteModalOpen}>
        <ModalHeader>
          <div>Remover Fornecedor</div>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Fechar</Button>
        </ModalHeader>
        <ModalBody>
          <>
            <p>Deseja remover o fornecedor {selectedSupplier?.name}?</p>
            <Button onClick={() => setIsDeleteModalOpen(false)}>cancelar</Button>
            <Button
              type="button"
              onClick={async () => {
                try {
                  await removeSupplierMutation.mutateAsync(
                    selectedSupplier?.id || ""
                  );
                  setIsDeleteModalOpen(false);
                } catch {
                  alert("não foi possível remover");
                  setIsDeleteModalOpen(false);
                }
              }}
            >
              {createSupplierMutation.status === "pending"
                ? "removendo"
                : "remover"}
            </Button>
          </>
        </ModalBody>
      </Modal>
      <Modal isOpen={isModalOpen}>
        <ModalHeader>
          <div>Editar Fornecedor</div>
          <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
        </ModalHeader>
        <ModalBody>
          <SupplierForm supplier={selectedSupplier}>
            {({ handleSubmit }) => {
              return (
                <>
                  <Button onClick={() => setIsModalOpen(false)}>
                    cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit(async (data) => {
                      if (!selectedSupplier) {
                        try {
                          await createSupplierMutation.mutateAsync(data);
                          setIsModalOpen(false);
                        } catch {
                          alert("não foi opssivel salvar");
                          setIsModalOpen(false);
                        }
                      } else {
                        try {
                          await editSupplierMutation.mutateAsync({
                            id: selectedSupplier.id,
                            supplier: { ...data, id: selectedSupplier.id },
                          });
                          setIsModalOpen(false);
                        } catch {
                          alert("não foi opssivel salvar");
                          setIsModalOpen(false);
                        }
                      }
                    })}
                  >
                    {createSupplierMutation.status === "pending"
                      ? "Salvando"
                      : "Salvar"}
                  </Button>
                </>
              );
            }}
          </SupplierForm>
        </ModalBody>
      </Modal>
      <div style={{ height: "90vh", overflowY: "scroll" }}>
        <FormFieldsContainer>
          {data?.data.map((supplier) => {
            return (
              <div key={supplier.id}>
                <SupplierCard
                  onClickDelete={(supplier) => {
                    setSelectedSupplier(supplier);
                    setIsDeleteModalOpen(true);
                  }}
                  supplier={supplier}
                  onClickEdit={(supplier) => {
                    setSelectedSupplier(supplier);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            );
          })}
        </FormFieldsContainer>
      </div>
    </>
  );
};
