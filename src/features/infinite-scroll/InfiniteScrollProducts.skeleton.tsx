import { Skeleton } from 'src/components/Skeleton';
import styled from 'styled-components';

export default function InfiniteScrollProductsSkeleton() {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, i) => {
          return (
            <S_Box key={`infinite-skeleton-${i}`}>
              <Skeleton style={{ width: '180px', height: '180px', borderRadius: '8px' }} />
              <Skeleton style={{ width: '180px', height: '180px', borderRadius: '8px' }} />
            </S_Box>
          );
        })}
    </>
  );
}

const S_Box = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  margin: 8px;
`;
