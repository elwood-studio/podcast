import type { AppProps } from 'next/app'

import { TemplateApp } from '../theme/template'
import '../theme/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TemplateApp>
      <Component {...pageProps} />
    </TemplateApp>
  )
}
