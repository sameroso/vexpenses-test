import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { suppliersQueryOptions } from "./query-config";

type UseSuppliersOptions = {
  queryConfig?: QueryConfig<typeof suppliersQueryOptions>;
};

export const useGetSuppliers = (args?: UseSuppliersOptions) => {
  return useQuery({
    ...suppliersQueryOptions(),
    ...(args?.queryConfig || []),
  });
};
