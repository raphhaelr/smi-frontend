import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './styles.css'
import { DeleteIcon } from '../DeleteIcon'
import { useDeleteProductMutation } from '@/mutations/products/useDeleteProduct'

interface ModalProps {
  productId: string
}

export function DeleteProductModal({ productId }: ModalProps) {
  const { mutateAsync } = useDeleteProductMutation()

  async function handleDeleteProduct(id: string) {
    await mutateAsync({ id })
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="flex cursor-pointer items-center rounded text-base font-bold uppercase text-buttonTextCollor">
          <DeleteIcon />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle uppercase">
            Deletar produto
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Essa ação não pode ser desfeita, isso irá apagar permanentemente o
            produto.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve cursor-pointer">CANCELAR</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="Button red cursor-pointer bg-orangeSmi text-white"
                onClick={() => handleDeleteProduct(productId)}
              >
                SIM
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
