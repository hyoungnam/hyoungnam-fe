import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import AuthProvider from 'src/context/AuthProvider';
import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import ErrorBoundary from 'src/components/ErrorBoundary';
import ErrorFallback from 'src/components/ErrorFallback';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
          },
        },
      })
  );

  return (
    <>
      <GlobalStyle />
      <S_Background />
      <S_Content>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </Hydrate>
          </QueryClientProvider>
        </ErrorBoundary>
      </S_Content>
    </>
  );
}

export default MyApp;

const S_Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const S_Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
