import * as React from 'react'

export function ProductsIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_51_306)">
        <path
          d="M20.25 8.25h-1.5v-1.5A3.75 3.75 0 0015 3h-1.048c-1.117-.956-2.625-1.5-4.202-1.5-3.308 0-6 2.355-6 5.25V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-.75h1.5a2.25 2.25 0 002.25-2.25v-6a2.25 2.25 0 00-2.25-2.25zm-10.5 9a.75.75 0 11-1.5 0v-7.5a.75.75 0 011.5 0v7.5zm4.5 0a.75.75 0 11-1.5 0v-7.5a.75.75 0 111.5 0v7.5zM5.344 6C5.762 4.29 7.58 3 9.75 3c1.3 0 2.537.469 3.395 1.292a.75.75 0 00.518.208H15A2.25 2.25 0 0117.12 6H5.345zM21 16.5a.75.75 0 01-.75.75h-1.5v-7.5h1.5a.75.75 0 01.75.75v6z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_51_306">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
