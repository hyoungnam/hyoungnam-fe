import { Skeleton } from 'src/components/Skeleton';
import styled from 'styled-components';

export default function PaginationSkeleton() {
  return (
    <S_Box>
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <S_SkeletonWrapper key={`skeleton-${i}`}>
            <Skeleton style={skeletonStyle} />
            <Skeleton style={skeletonStyle} />
          </S_SkeletonWrapper>
        ))}

      <S_SkeletonWrapper style={{ margin: 32 }}>
        <Skeleton style={{ ...skeletonStyle, height: '20px' }} />
      </S_SkeletonWrapper>
    </S_Box>
  );
}

const S_Box = styled.div`
  width: 100%;
`;

const S_SkeletonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px;
`;

const skeletonStyle = { width: '160px', height: '160px', borderRadius: '8px' };
