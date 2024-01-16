import { api } from '@/api/api'

import { CreateDemandFormData } from '@/app/demands/AddDemandModal'
import { IProduct } from '@/app/products/page'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useCreateDemandMutation() {
  const useCreateDemand = async (params: CreateDemandFormData) => {
    const { data } = await api.post<IProduct>('/demands', {
      ...params,
    })

    return data
  }

  return useMutation({
    mutationFn: useCreateDemand,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['getDemands'] }),
  })
}
