import { supplierService } from '@/services/suppliers'
import { queryOptions } from '@tanstack/react-query'

export const suppliersQueryOptions = () => {
    return queryOptions({
        queryKey: ['suppliers'],
        queryFn: supplierService.getSuppliers,
    })
}
