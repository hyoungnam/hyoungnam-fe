import styled from 'styled-components';
import ProductList from 'src/components/ProductList';
import Pagination from 'src/components/Pagination';
import usePaginationQuery from './usePagination';
import { getProductsApi } from 'src/api';

interface Props {
  page: number;
}

export default function ProductPagination(props: Props) {
  const {
    page,
    data,
    setPage,
    pagingNums,
    hasPreviousPaging,
    hasNextPaging,
    setPreviousMaxPaging,
    setNextMinPaging,
  } = usePaginationQuery({ page: props.page, queryKey: 'products', queryFn: getProductsApi });

  const { products } = data.data;

  return (
    <main>
      <S_Section>
        <ProductList products={products} />
        <Pagination
          page={page}
          pagingNums={pagingNums}
          hasPreviousPaging={hasPreviousPaging}
          hasNextPaging={hasNextPaging}
          onPreviousPagingButtonClick={setPreviousMaxPaging}
          onPagingNumButtonClick={setPage}
          onNextPagingButtonClick={setNextMinPaging}
        />
      </S_Section>
    </main>
  );
}

const S_Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
