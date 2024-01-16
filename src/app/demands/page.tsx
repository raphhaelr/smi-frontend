'use client'

import { AddDemandModal } from './AddDemandModal'
import { EditDemandModal } from './EditDemandModal'
import { api } from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { DeleteDemandModal } from './DeleteDemandModal'

interface IProduct {
  id: string
  name: string
  description: string
  sku: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductDemand {
  product: IProduct
  sku?: string
  description?: string
  producedQuantity: number
  requiredQuantity: number
  updatedAt?: Date
}

export interface IDemand {
  _id: string
  referenceStartDate: string
  referenceEndDate: string
  productDemands: IProductDemand[]
  status: string
  totalRequiredQuantity: number
  createdAt: Date
  updatedAt: Date
}

export default function Demands() {
  const { data: demands } = useQuery({
    queryKey: ['getDemands'],
    queryFn: async () => {
      const { data } = await api.get<IDemand[]>('/demands')

      return data
    },
    refetchOnWindowFocus: true,
  })

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold uppercase text-titleColor">
          Demandas
        </h1>
      </div>

      <div className="flex">
        <div>
          <AddDemandModal title="Adicionar demanda" />
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full shadow-table">
          <thead className="gap-2 bg-tableHeaderColor ">
            <tr className="text-left uppercase">
              <th className="rounded-tl-lg px-8 py-3">Período</th>
              <th>SKUs</th>
              <th>Total Planejado (tons)</th>
              <th>Status</th>
              <th className="rounded-tr-lg"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-tableBorderBottomColor border-solid">
            {demands &&
              demands.map((demand) => (
                <tr className=" text-left" key={demand._id}>
                  <td className="px-8 py-3">
                    {format(
                      demand.referenceStartDate.replace('Z', ''),
                      'dd/MM/yyyy',
                    )}{' '}
                    -{' '}
                    {format(
                      demand.referenceEndDate.replace('Z', ''),
                      'dd/MM/yyyy',
                    )}
                  </td>
                  <td>{demand.productDemands.length}</td>
                  <td>{demand.totalRequiredQuantity}</td>
                  <td>
                    <div
                      className={`flex   max-w-40 items-center justify-center gap-2 rounded-status px-4 py-1 ${demand.status === 'Planning' ? 'bg-inactiveStatusColor' : demand.status === 'In Progress' ? 'bg-activeStatusColor' : 'bg-finishedStatusColor'}`}
                    >
                      <span>
                        {demand.status === 'Planning'
                          ? 'Planejamento'
                          : demand.status === 'In Progress'
                            ? 'Em andamento'
                            : 'Finalizada'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <EditDemandModal title="Editar demanda" demand={demand} />

                      <DeleteDemandModal demandId={demand._id} />
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
