import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { getSuppliersQueryOptions } from "./query-config";

type UseSuppliersOptions = {
  queryConfig?: QueryConfig<typeof getSuppliersQueryOptions>;
};

export const useGetSuppliers = (args?: UseSuppliersOptions) => {
  return useQuery({
    ...getSuppliersQueryOptions(),
    ...(args?.queryConfig || []),
  });
};
