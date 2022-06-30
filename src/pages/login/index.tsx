import type { NextPage } from 'next';
import React from 'react';
import BlockAuthUserAccess from 'src/components/BlockAuthUser';
import Header from 'src/components/Header';
import Login from 'src/features/login';

const LoginPage: NextPage = () => {
  return (
    <>
    <Header />
    <BlockAuthUserAccess>
      <Login />
    </BlockAuthUserAccess>
    </>
  );
};

export default LoginPage;
