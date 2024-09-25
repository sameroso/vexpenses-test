import { supplierService } from "@/services/suppliers";
import { queryOptions } from "@tanstack/react-query";

export const getSuppliersQueryOptions = () => {
  return queryOptions({
    queryKey: ["suppliers"],
    queryFn: supplierService.getSuppliers,
  });
};
