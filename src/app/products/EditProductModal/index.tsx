'use client'

import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './styles.css'
import { EditIcon } from '../EditIcon'
import { IProduct } from '../page'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUpdateProductMutation } from '@/mutations/products/useUpdateProduct'

interface ModalProps {
  title: string
  product: IProduct
}

const updateProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  status: z.string(),
})

export type UpdateProductFormData = z.infer<typeof updateProductSchema>

export const EditProductModal = ({ title, product }: ModalProps) => {
  const { register, handleSubmit, reset, control } =
    useForm<UpdateProductFormData>()

  const [open, setOpen] = useState<boolean>(false)

  const { mutateAsync } = useUpdateProductMutation()

  async function handleUpdateProduct(data: UpdateProductFormData) {
    console.log({ data })

    const stringStatus = data.status as unknown

    await mutateAsync({
      ...data,
      status: JSON.parse(stringStatus as string),
    })

    setOpen(false)
  }

  useEffect(() => {
    const stringStatus = product.status as unknown

    reset({ ...product, status: stringStatus as string })
  }, [product, reset])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex cursor-pointer items-center rounded text-base font-bold uppercase text-buttonTextCollor">
          <EditIcon className="mr-3" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent max-w-3xl">
          <Dialog.Title className="rounded-t bg-header px-4 py-2 text-xl font-semibold uppercase not-italic text-orangeSmi">
            {title}
          </Dialog.Title>

          <form
            className="px-12 py-4"
            onSubmit={handleSubmit(handleUpdateProduct)}
          >
            <div>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Nome
                  </label>
                  <input
                    className="h-10 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="Nome"
                    type="text"
                    {...register('name')}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="m-2 text-base font-normal text-titleColor">
                    SKU
                  </label>
                  <input
                    className="h-10 rounded border-2 border-solid px-4 py-2 outline-none disabled:opacity-35"
                    placeholder="SKU"
                    type="text"
                    disabled
                    {...register('sku')}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Descrição
                  </label>
                  <input
                    className="h-10 rounded border-2 border-solid px-4 py-2 outline-none"
                    placeholder="Descrição"
                    type="text"
                    {...register('description')}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-base font-normal text-titleColor">
                    Status
                  </label>

                  <div className="relative">
                    <Controller
                      name={`status`}
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="h-10 w-full appearance-none rounded border-commonInput border-solid border-selectColor bg-white px-4 py-2 outline-none"
                        >
                          <option value="option">Selecione</option>
                          <option value="true">Ativo</option>
                          <option value="false">Inativo</option>
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
              </div>
            </div>

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
                <button className="cursor-pointer gap-2 rounded border-commonInput border-solid border-orangeSmi bg-orangeSmi px-11 py-3 text-base font-bold uppercase text-buttonTextCollor">
                  Editar
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
