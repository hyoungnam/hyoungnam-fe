import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';
import { useAuthInfoDispatch, useAuthInfoState } from 'src/context/AuthProvider';

export default function Header() {
  const { NAME } = useAuthInfoState();
  return (
    <>
      <S_Header>
        {/* 헤더 왼쪽 영역 */}
        <h1>
          <Link href='/'>
            <S_Title>HAUS</S_Title>
          </Link>
        </h1>
        {/* 헤더 오른쪽 영역 */}
        {NAME ? <Logout /> : <Login />}
      </S_Header>
    </>
  );
}

function Logout() {
  const { NAME } = useAuthInfoState();
  const dispatch = useAuthInfoDispatch();
  return (
    <div>
      <p>{NAME}</p>
      <button onClick={() => dispatch?.logout()}>logout</button>
    </div>
  );
}

function Login() {
  return (
    <Link href='/login'>
      <p>login</p>
    </Link>
  );
}

const S_Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const S_Title = styled.a`
  font-size: 48px;
`;
