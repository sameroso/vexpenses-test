import { SupplierCard } from "@/features/supplier/components/supplier-card";
import { useGetSuppliers } from "@/features/supplier/api/get-suppliers";
import { SupplierForm } from "@/features/supplier/components/supplier-form";
import { useCreateSupplier } from "@/features/supplier/api/create-supplier";
import { Button, Modal, ModalBody, ModalHeader } from "@/components/ui";
import { useState } from "react";
import styled from "styled-components";
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

export const Supplier = () => {
  const { data } = useGetSuppliers();

  //   const removeSupplierMutation = useRemoveSupplier({
  //     mutationConfig: {
  //       onSuccess: (data) => {
  //         alert(`removeu o fornecedor ${data.data.name} com sucesso!`);
  //       },
  //       onError: () => {
  //         alert("falha ao remover o fornecedor, por favor tente novamente");
  //       },
  //     },
  //   });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const createSupplierMutation = useCreateSupplier();
  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Adicionar Fornecedor
      </Button>
      <Modal isOpen={isModalOpen}>
        <ModalHeader>
          <div>Editar Fornecedor</div>
          <Button onClick={() => setIsModalOpen(false)}>Fechar</Button>
        </ModalHeader>
        <ModalBody>
          <SupplierForm>
            {({ handleSubmit }) => {
              return (
                <>
                  <Button onClick={() => setIsModalOpen(false)}>
                    cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit(async (data) => {
                      try {
                        await createSupplierMutation.mutateAsync(data);
                        setIsModalOpen(false);
                      } catch {
                        alert("não foi opssivel salvar");
                        setIsModalOpen(false);
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
              <div
                key={supplier.id}
                // onClick={() => {
                //   removeSupplierMutation.mutate(supplier.id);
                // }}
              >
                <SupplierCard
                  id={supplier.id}
                  address={{
                    city: supplier?.address.city || "",
                    code: supplier?.address.code || "",
                    number: supplier?.address.number || "",
                    reference: supplier?.address.reference || "",
                    state: supplier?.address?.state || "",
                    street: supplier?.address.street || "",
                  }}
                  contact={supplier?.contact || []}
                  description={supplier?.description || ""}
                  name={supplier?.name || ""}
                />
              </div>
            );
          })}
        </FormFieldsContainer>
      </div>
    </>
  );
};
