import theme from '@/styles/theme';
import DocumentCreatorProvider from '@/utils/context/DocumentCreatorContext';
import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DocumentCreatorProvider>
        {getLayout(<Component {...pageProps} />)}
      </DocumentCreatorProvider>
    </ChakraProvider>
  );
}

export default MyApp;
