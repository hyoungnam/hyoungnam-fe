import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

interface Props {
  page: number;
  pagingNums: number[];
  hasPreviousPaging: boolean;
  hasNextPaging: boolean;
  onPreviousPagingButtonClick: () => void;
  onNextPagingButtonClick: () => void;
  onPagingNumButtonClick: (pagingNum: number) => void;
}

const Pagination = ({
  page,
  pagingNums,
  hasPreviousPaging,
  hasNextPaging,
  onPreviousPagingButtonClick,
  onNextPagingButtonClick,
  onPagingNumButtonClick,
}: Props) => {
  return (
    <S_Box>
      {/* 이전 범위 버튼 */}
      <S_Button onClick={onPreviousPagingButtonClick} disabled={!hasPreviousPaging}>
        <VscChevronLeft />
      </S_Button>
      <S_PagingWrapper>
        {pagingNums.map((pagingNum: number) => (
          <S_PagingNumButton
            key={`paging-${pagingNum}`}
            selected={pagingNum === page}
            disabled={pagingNum === page}
            onClick={() => onPagingNumButtonClick(pagingNum)}
          >
            {pagingNum}
          </S_PagingNumButton>
        ))}
      </S_PagingWrapper>
      {/* 다음 범위 버튼 */}
      <S_Button onClick={onNextPagingButtonClick} disabled={!hasNextPaging}>
        <VscChevronRight />
      </S_Button>
    </S_Box>
  );
};

export default Pagination;

const S_Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const S_Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const S_PagingWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const S_PagingNumButton = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
