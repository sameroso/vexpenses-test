import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MutationConfig } from '@/lib/react-query'

import { supplierService } from '@/services/suppliers'
import { suppliersQueryOptions } from './query-config'

type UseCreateSuppliersOptions = {
    mutationConfig?: MutationConfig<typeof supplierService.createSupplier>
}

export const useCreateSupplier = ({
    mutationConfig,
}: UseCreateSuppliersOptions = {}) => {
    const queryClient = useQueryClient()

    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: suppliersQueryOptions().queryKey,
            })
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: supplierService.createSupplier,
    })
}
