import { QueryConfig } from '@/lib/react-query'
import { useQuery } from '@tanstack/react-query'
import { suppliersQueryOptions } from './query-config'
import { supplierService } from '@/services/suppliers'

type UseSuppliersOptions = {
    queryConfig?: QueryConfig<typeof suppliersQueryOptions>
}

export const useGetSuppliers = (args?: UseSuppliersOptions) => {
    return useQuery({
        ...suppliersQueryOptions(),
        queryFn: supplierService.getSuppliers,
        ...(args?.queryConfig || []),
    })
}
