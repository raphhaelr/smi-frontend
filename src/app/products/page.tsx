'use client'

import { AddProductModal } from './AddProductModal'
import { EditProductModal } from './EditProductModal'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/api'
import { DeleteProductModal } from './DeleteProductModal'

export interface IProduct {
  _id: string
  name: string
  description: string
  sku: string
  status: boolean
  createdAt: Date
  updatedAt: Date
}

export default function Products() {
  const { data: products } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const { data } = await api.get<IProduct[]>('/products')

      return data
    },
    refetchOnWindowFocus: true,
  })

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold uppercase text-titleColor">
          Produtos
        </h1>
      </div>

      <div className="flex">
        <div>
          <AddProductModal title="Adicionar produto" />
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full shadow-table">
          <thead className="gap-2 bg-tableHeaderColor ">
            <tr className="text-left uppercase">
              <th className="rounded-tl-lg px-8 py-3">Nome</th>
              <th>Descrição</th>
              <th>SKU</th>
              <th>Status</th>
              <th className="rounded-tr-lg"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-tableBorderBottomColor border-solid">
            {products &&
              products.map((product) => (
                <tr className=" text-left" key={product._id}>
                  <td className="px-8 py-3">{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.sku}</td>
                  <td>
                    <div
                      className={`rounded-status ${product.status ? 'bg-activeStatusColor' : 'bg-inactiveStatusColor'} flex items-center justify-center gap-2 px-4 py-1`}
                    >
                      <span>{product.status ? 'Ativo' : 'Inativo'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <EditProductModal
                        title="Editar produto"
                        product={product}
                      />

                      <DeleteProductModal productId={product._id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
