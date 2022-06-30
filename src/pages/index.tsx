import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Header from 'src/components/Header';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <S_Section>
          <Link href='/pagination?page=1'>
            <S_Anchor>pagination</S_Anchor>
          </Link>
          <Link href='/infinite-scroll'>
            <S_Anchor>infinite scroll</S_Anchor>
          </Link>
        </S_Section>
      </main>
    </>
  );
};

export default HomePage;

const S_Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const S_Anchor = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
