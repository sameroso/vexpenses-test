import { AddressService } from "@/services/address";
import { queryOptions } from "@tanstack/react-query";
import type { OnResponse } from "./types";

interface AddressOptions extends OnResponse {
  cep: string;
}
export const addressQueryOptions = ({
  cep,
  onError,
  onSuccess,
}: AddressOptions) => {
  return queryOptions({
    queryKey: ["address", cep],
    queryFn: async ({ queryKey }) => {
      try {
        const res = await AddressService.getAdressByCode(queryKey[1]);
        onSuccess?.(res);
        return res;
      } catch (err) {
        onError?.(err);
        return err;
      }
    },
  });
};
