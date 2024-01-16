import * as React from 'react'

export function DemandsIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M18.75 3h-3.4a4.492 4.492 0 00-6.7 0h-3.4a1.5 1.5 0 00-1.5 1.5v15.75a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5zM12 3a3 3 0 013 3H9a3 3 0 013-3zm3 12H9a.75.75 0 110-1.5h6a.75.75 0 110 1.5zm0-3H9a.75.75 0 110-1.5h6a.75.75 0 110 1.5z"
        fill={props.fill}
      />
    </svg>
  )
}
