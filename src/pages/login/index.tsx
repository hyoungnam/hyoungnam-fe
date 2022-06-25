import type { NextPage } from 'next';
import React from 'react';
import BlockAuthUserAccess from 'src/components/BlockAuthUser';
import Login from 'src/features/login';

const LoginPage: NextPage = () => {
  return (
    <BlockAuthUserAccess>
      <Login />
    </BlockAuthUserAccess>
  );
};

export default LoginPage;
