'use client'
import React, { ChangeEvent, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './styles.css'
import { DeleteIcon } from '../../products/DeleteIcon'
import { PlusIcon } from './PlusIcon'
import { AddIcon } from '../Add'
import { api } from '@/api/api'
import { IProduct } from '@/app/products/page'
import { useQuery } from '@tanstack/react-query'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateDemandMutation } from '@/mutations/demands/useCreateDemand'

interface ModalProps {
  title: string
}

const createProductDemandSchema = z.object({
  product: z.string(),
  description: z.string(),
  sku: z.string(),
  requiredQuantity: z.number(),
})

const createDemandSchema = z.object({
  referenceStartDate: z.coerce.date(),
  referenceEndDate: z.coerce.date(),
  productDemands: z.array(createProductDemandSchema),
  status: z.boolean(),
})

export type CreateDemandFormData = z.infer<typeof createDemandSchema>

export const AddDemandModal = ({ title }: ModalProps) => {
  const { data: products } = useQuery({
    queryKey: ['getProducts'],
    queryFn: async () => {
      const { data } = await api.get<IProduct[]>('/products')

      return data
    },
    refetchOnWindowFocus: true,
  })

  const { register, handleSubmit, control, setValue } =
    useForm<CreateDemandFormData>({
      defaultValues: {
        productDemands: [
          { product: '', requiredQuantity: 0, description: '', sku: '' },
        ],
      },
    })

  const { fields, append, remove } = useFieldArray({
    name: 'productDemands',
    control,
  })

  const [open, setOpen] = useState<boolean>(false)

  const { mutateAsync } = useCreateDemandMutation()

  const handleProductChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const productId = e.target.value

    const product = products?.find(
      (findProduct) => findProduct._id === productId,
    )

    setValue(
      `productDemands.${index}.description`,
      product?.description as string,
    )
    setValue(`productDemands.${index}.sku`, product?.sku as string)

    setValue(`productDemands.${index}.product`, product?._id as string)
  }

  async function handleCreateDemand(data: CreateDemandFormData) {
    console.log({ data })

    await mutateAsync(data)

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex cursor-pointer items-center rounded bg-orangeSmi px-10 py-3 text-base font-bold uppercase text-buttonTextCollor">
          <AddIcon className="mr-2" />
          Adicionar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent max-w-6xl overflow-y-auto">
          <Dialog.Title className="rounded-t bg-header px-4 py-2 text-xl font-semibold uppercase not-italic text-orangeSmi">
            {title}
          </Dialog.Title>

          <form
            className="px-12 py-4"
            onSubmit={handleSubmit(handleCreateDemand)}
          >
            <div className="border-b-commonInput border-solid border-orangeSmi pb-6">
              <div className="mb-6">
                <span className="text-base font-semibold text-titleColor">
                  Período
                </span>
              </div>

              <div className="flex flex-row">
                <div className="mr-4 flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Data inicial
                  </label>
                  <input
                    className="h-10 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="Data inicial"
                    type="date"
                    {...register(`referenceStartDate`)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Data final
                  </label>
                  <input
                    className="h-10 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="Data final"
                    type="date"
                    {...register(`referenceEndDate`)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="mb-6">
                <span className="text-base font-semibold text-titleColor">
                  Produtos
                </span>
              </div>
            </div>

            {fields.map((productForm, index) => (
              <div
                className="scroll flex justify-between "
                key={productForm.id}
              >
                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Produto
                  </label>

                  <div className="relative">
                    <Controller
                      name={`productDemands.${index}.product`}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          onChange={(e) => handleProductChange(e, index)}
                          className="h-10  w-64 max-w-56 appearance-none rounded border-commonInput border-solid border-selectColor bg-white px-4 py-2 outline-none"
                        >
                          <option value="option">Selecione</option>
                          {products
                            ?.filter((product) => product.status)
                            ?.map((product) => (
                              <option key={product._id} value={product._id}>
                                {product.name}
                              </option>
                            ))}
                        </select>
                      )}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-4 w-4 text-orangeSmi"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Descrição
                  </label>
                  <input
                    className="h-10 max-w-56 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="Descrição"
                    disabled
                    {...register(`productDemands.${index}.description`)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    SKU
                  </label>
                  <input
                    className="h-10 max-w-56 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="SKU"
                    disabled
                    {...register(`productDemands.${index}.sku`)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Total planejado (tons)
                  </label>
                  <input
                    type="number"
                    className="h-10 max-w-56 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="Total planejado (tons)"
                    {...register(`productDemands.${index}.requiredQuantity`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="flex flex-col-reverse">
                  <button
                    className="flex max-h-10 max-w-10 cursor-pointer rounded bg-plusButtonColor p-2"
                    type="button"
                    onClick={() =>
                      index === 0
                        ? append({
                            product: '',
                            requiredQuantity: 0,
                            description: '',
                            sku: '',
                          })
                        : remove(index)
                    }
                  >
                    {index === 0 ? (
                      <PlusIcon />
                    ) : (
                      <DeleteIcon width={24} height={24} />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close asChild>
                <div className="flex justify-end py-6">
                  <button className=" mr-4 cursor-pointer gap-2 rounded border-2 border-solid border-orangeSmi px-11 py-3 text-base font-bold uppercase text-orangeSmi">
                    Cancelar
                  </button>
                </div>
              </Dialog.Close>

              <div className="flex justify-end py-6">
                <button
                  type="submit"
                  className="cursor-pointer gap-2 rounded border-commonInput border-solid border-orangeSmi bg-orangeSmi px-11 py-3 text-base font-bold uppercase text-buttonTextCollor"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="IconButton cursor-pointer text-orangeSmi"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
