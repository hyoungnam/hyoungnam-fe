import { useEffect, useRef } from 'react';

const baseOptions = {
  threshold: 0.6,
};

/**
 * 교차관찰자 사용을 위한 콜백과 옵션을 인자로 받으며, 탐지할 대상 ref 변수를 반환하는 hook
 * @param onIntersect 감지대상이 보이면 실행할 콜백
 * @param option Override하기 원하는 옵저버 옵션
 * @see https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API
 */
const useIntersectionObserver = <T extends HTMLElement>(onIntersect: () => void, options = {}) => {
  const targetRef = useRef<T>(null);
  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) onIntersect();
        },
        { ...baseOptions, ...options }
      );
      observer.observe(targetRef.current);
    }
    return () => {
      targetRef.current && observer.unobserve(targetRef.current);
    };
  }, [onIntersect, options]);
  return targetRef;
};

export default useIntersectionObserver;
