import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { addressQueryOptions } from "./query-config";
import { OnResponse } from "./types";

interface UseGetAddressByCepOptions extends OnResponse {
  queryConfig?: QueryConfig<typeof addressQueryOptions>;
  cep: string;
}

export const useGetAddressByCep = (args: UseGetAddressByCepOptions) => {
  return useQuery({
    ...addressQueryOptions({
      cep: args?.cep,
      onSuccess: args?.onSuccess,
      onError: args?.onError,
    }),
    ...(args?.queryConfig || []),
  });
};
