import '../styles/globals.css'
import '../styles/sidebar.css'
import '../styles/navbar.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
