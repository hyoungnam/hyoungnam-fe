import type { NextPage, GetServerSideProps } from 'next';
import { Suspense } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { getProductsApi } from 'src/api';
import Header from 'src/components/Header';
import SixshopProductPagination from 'src/features/pagination';
import { default as Skeleton } from 'src/features/pagination/Pagination.skeleton';

const PaginationPage: NextPage<{ page: number }> = ({ page }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <SixshopProductPagination page={page} />
      </Suspense>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query: { page } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['products', page], () => getProductsApi(page as any));
  return {
    props: { dehydratedState: dehydrate(queryClient), page: Number(page) },
  };
};

export default PaginationPage;
