import { api } from '@/api/api'
import { queryClient } from '@/lib/react-query'
import { IProduct } from '@/app/products/page'
import { useMutation } from '@tanstack/react-query'

interface DeleteParams {
  id: string
}

export function useDeleteDemandMutation() {
  const useDeleteDemand = async ({ id }: DeleteParams) => {
    const { data } = await api.delete<IProduct>(`/demands/${id}`)

    return data
  }

  return useMutation({
    mutationFn: useDeleteDemand,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['getDemands'] }),
  })
}
