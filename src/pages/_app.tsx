import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme  from '../styles/theme/index';
import LayoutDashboard from '../components/Layout/Index';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <LayoutDashboard>
        <Component {...pageProps} />
      </LayoutDashboard>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
