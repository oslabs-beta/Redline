import '../styles/globals.css'
import '../styles/sidebar.scss'
import '../styles/navbar.scss'
import '../styles/modal.scss'
import '../styles/charts.scss'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
