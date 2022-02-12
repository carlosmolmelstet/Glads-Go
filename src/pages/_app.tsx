import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from '../context/AuthContext'
import { queryClient } from '../services/queryClient'
import theme from '../styles/theme/index'
import React from 'react'
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
