import { api } from '@/api/api'
import { queryClient } from '@/lib/react-query'
import { IProduct } from '@/app/products/page'
import { useMutation } from '@tanstack/react-query'

interface DeleteParams {
  id: string
}

export function useDeleteProductMutation() {
  const useDeleteProduct = async ({ id }: DeleteParams) => {
    const { data } = await api.delete<IProduct>(`/products/${id}`)

    return data
  }

  return useMutation({
    mutationFn: useDeleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['getProducts'] }),
  })
}
