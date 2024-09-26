import { SupplierCard } from "@/features/supplier/components/supplier-card";
import { useGetSuppliers } from "@/features/supplier/api/get-suppliers";
import { SupplierForm } from "@/features/supplier/components/supplier-form";
import { useCreateSupplier } from "@/features/supplier/api/create-supplier";
import { Button, Modal, ModalBody, ModalHeader } from "@/components/ui";
import { useState } from "react";
import { Supplier } from "@/services/suppliers";
import { useEditSupplier } from "@/features/supplier/api/edit-supplier";
import { useRemoveSupplier } from "@/features/supplier/api/remove-suppliers";
import { downloadCSV } from "@/utils/csv-helpers";
import { Add } from "@/components/ui/icons/add";
import { Export } from "@/components/ui/icons/export";
import { CardsContainer } from "./styles";
// import { useRemoveSupplier } from "@/features/supplier/api/remove-suppliers";

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
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "16px",
          gap: "8px",
        }}
      >
        <Add
          id="addSupplier"
          onClick={() => {
            setSelectedSupplier(undefined);
            setIsModalOpen(true);
          }}
          tooltipContent="Adicionar Fornecedor"
        />

        <Export
          tooltipContent="Exportar CSV"
          id="downloadCsv"
          onClick={() => downloadCSV(data?.data || [{}], "suppliers")}
        />
      </div>

      <Modal isOpen={isDeleteModalOpen}>
        <ModalHeader>
          <div>Remover Fornecedor</div>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Fechar</Button>
        </ModalHeader>
        <ModalBody>
          <>
            <p>Deseja remover o fornecedor {selectedSupplier?.name}?</p>
            <Button onClick={() => setIsDeleteModalOpen(false)}>
              cancelar
            </Button>
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

      <CardsContainer>
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
      </CardsContainer>
    </>
  );
};
