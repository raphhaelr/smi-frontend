import * as React from 'react'

export function DeleteIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      {...props}
    >
      <path
        d="M1 5h2m0 0h16M3 5v14a2 2 0 002 2h10a2 2 0 002-2V5M6 5V3a2 2 0 012-2h4a2 2 0 012 2v2m-6 5v6m4-6v6"
        stroke="#F05123"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
