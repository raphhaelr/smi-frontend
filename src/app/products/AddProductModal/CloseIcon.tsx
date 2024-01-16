import * as React from 'react'

export function CloseIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M22 10L10 22m0-12l12 12"
        stroke="#F05123"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
