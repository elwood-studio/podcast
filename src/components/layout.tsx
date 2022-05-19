import { PropsWithChildren } from 'react'

export type LayoutProps = {
  className?: string
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <div className={`h-screen w-screen ${props.className}`}>
      {props.children}
    </div>
  )
}
