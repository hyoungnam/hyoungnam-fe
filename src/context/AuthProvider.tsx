import { useRouter } from 'next/router';
import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { authApi } from 'src/api';
import { STORAGE_KEY } from 'src/utilities/storageKey';

export interface AuthInfo {
  ID: string;
  NAME: string;
  isAuth: boolean;
}

interface AuthInfoDispatch {
  login: (user: AuthInfo, accessToken: string) => void;
  logout: () => void;
}

const initialAuthInfo = {
  ID: '',
  NAME: '',
  isAuth: false,
};

const AuthInfoContext = createContext<AuthInfo>(initialAuthInfo);
const AuthInfoDispatchContext = createContext<AuthInfoDispatch | null>(null);

/**
 * 인증 유저 정보 제공 및 마운트시 인증 유효성 추가 확인
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authInfo, setAuthInfo] = useState(initialAuthInfo);
  const router = useRouter();

  /**
   * 유저 정보 원격 확인
   */
  const checkAuth = async (userId: string) => {
    const { data } = await authApi(userId);
    setAuthInfo({ ...data.user, isAuth: true });
  };

  // 조금 애매한 로직입니다.
  // 토큰값 존재만으로 로그인을 계속 유지하는것을 판별하기 애매하였고, Mock API를 사용하고 있는 상황에서
  // 인증을 좀 더 확인하고자 유저 정보 확인 API를 활용하였습니다.
  useEffect(() => {
    try {
      const storageData = window.localStorage.getItem(STORAGE_KEY.AUTH_INFO) || '';
      // 스토리지에 토큰이 존재하는 경우에만 유저 확인 작업을 실행
      if (!!storageData) {
        const authInfo: { user: AuthInfo; accessToken: string } = JSON.parse(storageData);
        checkAuth(authInfo.user.ID);
      }
    } catch (err) {
      alert(err);
      router.push('/404');
    }
  }, []);

  const login = (user: AuthInfo, accessToken: string) => {
    window.localStorage.setItem(STORAGE_KEY.AUTH_INFO, JSON.stringify({ user, accessToken }));
    setAuthInfo({ ...user, isAuth: true });
  };
  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY.AUTH_INFO);
    setAuthInfo({ ...initialAuthInfo });
  };

  return (
    <AuthInfoDispatchContext.Provider value={{ login, logout }}>
      <AuthInfoContext.Provider value={authInfo}>{children}</AuthInfoContext.Provider>
    </AuthInfoDispatchContext.Provider>
  );
}

export function useAuthInfoState() {
  const authInfo = useContext(AuthInfoContext);
  if (authInfo === undefined) {
    throw new Error('useAuthInfoState 사용전에 AuthProvider를 사용하주세요');
  }
  return authInfo;
}

export function useAuthInfoDispatch() {
  const dispatch = useContext(AuthInfoDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useAuthInfoDispatch 사용전에 AuthProvider를 사용하주세요');
  }
  return dispatch;
}
