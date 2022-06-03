import type { AppProps } from 'next/app'

import { ThemeApp } from '../theme/template'
import '../theme/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeApp>
      <Component {...pageProps} />
    </ThemeApp>
  )
}
