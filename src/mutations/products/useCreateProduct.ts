import { api } from '@/api/api'
import { queryClient } from '@/lib/react-query'
import { CreateProductFormData } from '@/app/products/AddProductModal'
import { IProduct } from '@/app/products/page'
import { useMutation } from '@tanstack/react-query'

export function useCreateProductMutation() {
  const useCreateProduct = async (params: CreateProductFormData) => {
    const { data } = await api.post<IProduct>('/products', {
      ...params,
    })

    return data
  }

  return useMutation({
    mutationFn: useCreateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['getProducts'] }),
  })
}
