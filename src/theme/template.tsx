import {
  createTemplate,
  App,
} from '@elwood-studio/distribute-react/template/podcast'
import { PropsWithChildren } from 'react'

export const template = createTemplate()

export function ThemeApp(props: PropsWithChildren<unknown>) {
  return <App template={template} {...props} />
}
