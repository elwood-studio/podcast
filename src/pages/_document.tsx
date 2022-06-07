import { Html, Head, Main, NextScript } from 'next/document'

import { template } from '../template'

export default function Document() {
  return (
    <Html>
      <Head>{template.GlobalCSS()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
