import type { NextPage } from 'next';
import React, { Suspense } from 'react';
import Header from 'src/components/Header';
import InfiniteScrollProducts from 'src/features/infinite-scroll';
import { default as Skeleton } from 'src/features/infinite-scroll/InfiniteScrollProducts.skeleton';

const InfiniteScrollPage: NextPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <InfiniteScrollProducts />
      </Suspense>
    </>
  );
};

export default InfiniteScrollPage;
