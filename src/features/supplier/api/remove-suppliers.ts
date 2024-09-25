import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";

import { supplierService } from "@/services/suppliers";
import { suppliersQueryOptions } from "./query-config";

export type DeleteUserDTO = {
  userId: string;
};

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof supplierService.removeSupplier>;
};

export const useRemoveSupplier = ({
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: suppliersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: supplierService.removeSupplier,
  });
};
