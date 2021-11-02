import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
 import { ReactQueryDevtools } from 'react-query/devtools'
import theme  from '../styles/theme/index';
import LayoutDashboard from '../components/Layout/Index';
import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <LayoutDashboard>
        <Component {...pageProps} />
      </LayoutDashboard>
      <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
