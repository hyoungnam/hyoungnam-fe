import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ISkeleton {
  children?: React.ReactNode;
  style: React.CSSProperties
}

export function Skeleton({ children, ...props }: ISkeleton) {
  return <S_Skeleton {...props}>{children}</S_Skeleton>;
}

const skeletonLoading = keyframes`
    0% {
      background-color: #eceff1;
    }
    100% {
      background-color: #b0bec5;
    }
`;

const S_Skeleton = styled.div`
  opacity: 0.7;
  animation: ${skeletonLoading} 1s linear infinite alternate;
`;
