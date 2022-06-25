import React, { useState, createContext, useContext, Dispatch } from 'react';

export interface UserInfo {
  ID: string;
  NAME: string;
}

interface UserInfoDispatch {
  login: (user: UserInfo) => void;
  logout: () => void;
}

const initialUserInfo = {
  ID: '',
  NAME: '',
};

const UserInfoContext = createContext<UserInfo | null>(null);
const UserInfoDispatchContext = createContext<UserInfoDispatch | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const login = (user: UserInfo) => setUserInfo({ ...userInfo, ...user });
  const logout = () => setUserInfo({ ...initialUserInfo });

  return (
    <UserInfoDispatchContext.Provider value={{ login, logout }}>
      <UserInfoContext.Provider value={userInfo}>{children}</UserInfoContext.Provider>
    </UserInfoDispatchContext.Provider>
  );
}

export function useUserInfoState() {
  const userInfo = useContext(UserInfoContext);
  if (userInfo === undefined) {
    throw new Error('useUserInfoState 사용전에 UserProvider를 사용하주세요');
  }
  return userInfo;
}

export function useUserInfoDispatch() {
  const dispatch = useContext(UserInfoDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useUserInfoDispatch 사용전에 UserProvider를 사용하주세요');
  }
  return dispatch;
}
