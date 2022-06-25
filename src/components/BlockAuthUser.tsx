import React, { useEffect } from 'react';
import { useAuthInfoState } from 'src/context/AuthProvider';
import { useRouter } from 'next/router';

/**
 * 인증 유저의 잘못된 접근을 방지, 클라이언트에서 처리
 * 아래 링크의 첫번째 접근 방식
 * @see https://nextjs.org/docs/authentication
 */
export default function BlockAuthUserAccess({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuthInfoState();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) router.replace('/');
  }, [isAuth]);

  if (isAuth) {
    return <div>...Loading</div>;
  }

  return <>{children}</>;
}
