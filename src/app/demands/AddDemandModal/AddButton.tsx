'use client'
import { AddIcon } from '../Add'

export function AddButton() {
  return (
    <button className="flex items-center rounded bg-orangeSmi px-10 py-3 text-base font-bold uppercase text-buttonTextCollor">
      <AddIcon className="mr-2" />
      Adicionar
    </button>
  )
}
