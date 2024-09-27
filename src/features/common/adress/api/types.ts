import { AddressService } from '@/services/address'

export interface OnResponse {
    onSuccess?: (
        data: Awaited<ReturnType<typeof AddressService.getAdressByCode>>
    ) => void
    onError?: (err: unknown) => void
}
