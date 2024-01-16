import { api } from '@/api/api'
import { queryClient } from '@/lib/react-query'
import { UpdateProductFormData } from '@/app/products/EditProductModal'
import { IProduct } from '@/app/products/page'
import { useMutation } from '@tanstack/react-query'

export function useUpdateProductMutation() {
  const useUpdateProduct = async (params: UpdateProductFormData) => {
    const { data } = await api.put<IProduct>('/products', {
      ...params,
    })

    return data
  }

  return useMutation({
    mutationFn: useUpdateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['getProducts'] }),
  })
}
