import React from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query';
import { getProductsApi } from 'src/api';
import { Product } from 'src/types/product';
import { default as Skeleton } from 'src/features/infinite-scroll/InfiniteScrollProducts.skeleton';
import useIntersectionObserver from 'src/hook/useInterSectionObserver';
import ProductList from 'src/components/ProductList';

type ProductData = {
  data: {
    products: Product[];
    totalCount: number;
  };
};

const PRODUCTS_SIZE_PER_SCROLL = 16;

export default function InfiniteScrollProducts() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    'products-infinite',
    ({ pageParam = 1 }) => getProductsApi(pageParam, PRODUCTS_SIZE_PER_SCROLL),
    {
      // 1000ms
      staleTime: 1000 * 60 * 5, 
      refetchOnWindowFocus: false,
      getNextPageParam,
    }
  );
  const targetRef = useIntersectionObserver(() => hasNextPage && fetchNextPage());

  return (
    <S_Section>
      <ProductList products={getProductsFromInifiteQueryPages(data!.pages)} />
      {isFetchingNextPage && <Skeleton />}
      <S_Observe ref={targetRef as any} />
    </S_Section>
  );
}

/**
 * 다음 스크롤(페이지)가 존재하는지 계산하는 함수
 * 다음 페이지가 존재하면 기존 param + 1 을 하여 다음 페이지 제품들을 가져온다, 존재하지 않는 경우 undefined을 반환
 */
const getNextPageParam = ({ data: { products, totalCount } }: ProductData) => {
  const lastProductId = Number(products[products.length - 1].id);
  const currentPageParam = Math.ceil(lastProductId / PRODUCTS_SIZE_PER_SCROLL);
  if (lastProductId < totalCount) {
    return currentPageParam + 1;
  }
  return undefined;
};

/**
 * useInfiniteQuery에서 반환하는 pages 배열을 가공하여 Product 배열로 합치는 함수
 */
const getProductsFromInifiteQueryPages = (pages: ProductData[]) => {
  return pages.reduce((arr: Product[] | [], { data }: ProductData) => {
    const { products } = data;
    if (arr.length === 0) return products;
    return [...arr, ...products];
  }, []);
};

const S_Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const S_Observe = styled.div`
  visibility: hidden;
`;
