import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Product } from 'src/types/product';
import React from 'react';
import styled from 'styled-components';
import Header from 'src/components/Header';
import { getProductByIdApi, getProductsApi } from 'src/api';

const ProductDetailPage: NextPage<{ product: Product }> = ({ product }) => {
  return (
    <>
      <Header />
      <Thumbnail
        src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'}
        alt={product.name}
      />
      <ProductInfoWrapper>
        <Name>{product.name}</Name>
        <Price>{product.price}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await getProductsApi();
  const { products } = data;
  const paths = products.map((product: Product) => ({
    params: { id: product.id },
  }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paramsId = Number(params?.id);
  try {
    const { data } = await getProductByIdApi(paramsId);

    const { product } = data;
    return {
      props: { product },
      revalidate: 15,
    };
  } catch (err: any) {
    // 현재 API 에러 404 응답에 따른 리다이렉트 설정
    if (err.response.status === 404) {
      return {
        redirect: {
          destination: '/NotProduct',
          permanent: false,
        },
      };
    }
    /**
     * ISR 에러 핸들링 관련 확인이 필요한 부분
     * @see https:nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#error-handling-and-revalidation
     */
    throw err;
  }
};

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
