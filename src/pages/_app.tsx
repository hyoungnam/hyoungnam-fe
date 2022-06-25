import type { AppProps } from 'next/app';
import { useState, useReducer, createContext } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import UserProvider from 'src/context/user';
import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <GlobalStyle />
      <S_Background />
      <S_Content>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </Hydrate>
        </QueryClientProvider>
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
