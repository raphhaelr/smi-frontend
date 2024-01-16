'use client'
import { useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Logo } from './Logo'
import Link from 'next/link'
import { DemandsIcon } from './DemandsIcon'
import { ProductsIcon } from './ProductsIcon'

export function Sidebar() {
  const [open, setOpen] = useState(true)

  const [menus, setMenus] = useState([
    {
      id: '1',
      name: 'Demandas',
      icon: DemandsIcon,
      status: true,
      path: '/demands',
    },
    {
      id: '2',
      name: 'Produtos',
      icon: ProductsIcon,
      status: false,
      path: '/products',
    },
  ])

  function handleChangeMenu(index: number) {
    // Create a new array with the updated object
    const updatedMenus = menus.map((obj, indexObject) =>
      indexObject === index
        ? { ...obj, status: true }
        : { ...obj, status: false },
    )

    setMenus(updatedMenus)
  }

  return (
    <div className="flex">
      <div
        className={`h-screen bg-header p-5 pt-8 ${open ? 'w-72' : 'w-20'} relative duration-300`}
      >
        <BsArrowLeftShort
          size={!open ? 26 : 28}
          className={`absolute -right-3 top-9 cursor-pointer rounded-full border bg-orangeSmi text-3xl ${!open && 'rotate-180'} border-orangeSmi text-white`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex items-center justify-center duration-200">
          <Logo width={93} className="float-left block" />
        </div>

        <ul className="pt-2">
          {menus.map(({ icon: Icon, id, name, status, path }, index) => (
            <Link
              href={path}
              className="mt-2 flex gap-x-4 rounded p-2 hover:bg-black"
              key={id}
              onClick={() => handleChangeMenu(index)}
            >
              <li
                key={1}
                className={`flex cursor-pointer items-center  rounded-md  text-sm text-gray-300`}
              >
                <span className="float-left mr-3 block text-2xl">
                  <Icon fill={status ? '#F05123' : '#F1F3F4'} />
                </span>
                <span
                  className={`flex-1 text-base font-medium ${!open && 'hidden'} duration-200`}
                >
                  {name}
                </span>
              </li>
            </Link>
          ))}

          {/* <Link
            href="/products"
            className="mt-2 flex gap-x-4 rounded p-2 hover:bg-black"
          >
            <li
              key={1}
              className={`flex cursor-pointer items-center  rounded-md  text-sm text-gray-300`}
            >
              <span className="float-left mr-3 block text-2xl">
                <ProductsIcon fill="#F05123" />
              </span>
              <span
                className={`flex-1 text-base font-medium ${!open && 'hidden'} duration-200`}
              >
                Produtos
              </span>
            </li>
          </Link> */}
        </ul>
      </div>
    </div>
  )
}
