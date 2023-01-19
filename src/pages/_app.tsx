import '../styles/globals.css'
import '../styles/sidebar.scss'
import '../styles/navbar.scss'
import '../styles/modal.scss'
import '../styles/charts.scss'
import '../styles/signup.scss'

import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
  )
}
