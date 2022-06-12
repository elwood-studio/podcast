import type { AppProps } from 'next/app'
import Link from 'next/link'

import '@elwood-studio/distribute-react/dist/podcast.css'

import { template } from '../template'

export default function App({ Component, pageProps }: AppProps) {
  const TemplateApp = template.App as (props: any) => JSX.Element

  return (
    <TemplateApp link={Link} initialAppState={pageProps.appState}>
      <Component {...pageProps} />
    </TemplateApp>
  )
}