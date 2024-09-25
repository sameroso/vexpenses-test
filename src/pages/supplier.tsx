
import { SupplierCard } from "@/features/supplier/components/supplier-card";
import { useGetSuppliers } from "@/features/supplier/api/get-suppliers";
import { useRemoveSupplier } from "@/features/supplier/api/remove-suppliers";

export const Supplier = () => {
  const { data } = useGetSuppliers();

  const removeSupplierMutation = useRemoveSupplier({
    mutationConfig: {
      onSuccess: (data) => {
        alert(`removeu o fornecedor ${data.data.name} com sucesso!`);
      },
      onError: () => {
        alert("falha ao remover o fornecedor, por favor tente novamente");
      },
    },
  });

  return (
    <>
      {data?.data.map((supplier) => {
        return (
          <div
            key={supplier.id}
            onClick={() => {
              removeSupplierMutation.mutate(supplier.id);
            }}
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
    </>
  );
};
