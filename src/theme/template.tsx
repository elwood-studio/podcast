import {
  createTemplate,
  App,
} from '@elwood-studio/distribute-react/template/podcast'
import { PropsWithChildren } from 'react'

export const template = createTemplate()

export function TemplateApp(props: PropsWithChildren<unknown>) {
  return <App template={template} {...props} />
}
