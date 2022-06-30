import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

const PAGING_SIZE = 5;
const PRODUCTS_SIZE_PER_PAGE = 10;

interface Parameters {
  page: number;
  queryKey: string;
  queryFn: (page: number) => any;
}

/**
 * Pagination Hook으로 react-query에 의존하고 있는 함수
 * totalCount가 원격 데이터이기에 Hook을 사용하는곳에서 React.Suspense 합성이 요구
 */
const usePaginationQuery = ({ page: currentPage, queryKey, queryFn }: Parameters) => {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);
  const { data } = useQuery([queryKey, page], () => queryFn(page), {
    keepPreviousData: true,
    suspense: true,
    staleTime: 1000 * 60 * 2,
    onError: () => router.replace('/404'),
  });

  const { totalCount } = data.data;

  const [minPagingNum, maxPagingNum] = calculatePagingNum(page, totalCount);
  const pagingNums = getPaginNumFromMinToMax(minPagingNum, maxPagingNum);
  /**
   * 이전 범위 존재 여부
   */
  const hasPreviousPaging = page > PAGING_SIZE;
  /**
   * 다음 범위 존재 여부
   */
  const hasNextPaging = maxPagingNum * PRODUCTS_SIZE_PER_PAGE < totalCount;
  /**
   * 이전 범위 버튼(<)을 클릭하면 이전 범위의 마지막 페이지를 보여줍니다
   * @example
   * 6~10 페이지가 보여지는 상황에서 버튼 클릭 시 1~5가 보이고 5페이지로 이동
   */
  const setPreviousMaxPaging = () => setPage(minPagingNum - 1);
  /**
   * 다음 범위 버튼(>)을 클릭하면 다음 범위의 첫 번째 페이지를 보여줍니다
   * @example
   * 1~5 페이지가 보여지는 상황에서 버튼 클릭 시 6~10이 보이고 6페이지로 이동
   */
  const setNextMinPaging = () => setPage(maxPagingNum + 1);

  return {
    page,
    data,
    setPage,
    pagingNums,
    hasPreviousPaging,
    hasNextPaging,
    setPreviousMaxPaging,
    setNextMinPaging,
  };
};

export default usePaginationQuery;

/**
 * 최소 페이징 크기와 최대 페이징 크기를 반환
 * @example
 * 현재 페이지가 3인 경우 [3,4,5,6,7]의 최소 3과 5가 아닌
 * [1,2,3,4,5]의 최소 1과 최대 5를 반환
 */
const calculatePagingNum = (page: number, totalCount: number) => {
  const totalPagingNum = Math.ceil(totalCount / PRODUCTS_SIZE_PER_PAGE);
  /**
   * 현재페이지와 페이지크기가 같아 0으로 떨어지는 경우 페이징 크기를 반환
   * OR 연산자가 빠지게 되는 경우, 현재 페이지가 5이고 페이징크기가 같은 5일때 페이지네이션은 6,7,8,9,10 으로 계산된다.
   */
  const pagingSizeRemainder = page % PAGING_SIZE || PAGING_SIZE;
  const minPagingNum = page - pagingSizeRemainder + 1;
  let maxPagingNum = page - pagingSizeRemainder + PAGING_SIZE;

  if (maxPagingNum > totalPagingNum) maxPagingNum = totalPagingNum;
  return [minPagingNum, maxPagingNum];
};

/**
 * 페이징 숫자들이 담긴 배열을 반환
 */
const getPaginNumFromMinToMax = (min: number, max: number) => {
  const pagingNums: number[] = Array(max - min + 1)
    .fill(min)
    .map((num, i) => num + i);

  return pagingNums;
};
