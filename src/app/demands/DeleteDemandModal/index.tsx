import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import './styles.css'
import { DeleteIcon } from '../DeleteIcon'
import { useDeleteDemandMutation } from '@/mutations/demands/useDeleteDemand'

interface ModalProps {
  demandId: string
}

export function DeleteDemandModal({ demandId }: ModalProps) {
  const { mutateAsync } = useDeleteDemandMutation()

  async function handleDeleteDemand(id: string) {
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
            Deletar demanda
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Essa ação não pode ser desfeita, isso irá apagar permanentemente a
            demanda.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve cursor-pointer">CANCELAR</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="Button red cursor-pointer"
                onClick={() => handleDeleteDemand(demandId)}
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
