import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useLoginMutation } from './useLoginMutation';

const ID = 'id';
const PASSWORD = 'password';

export default function Login() {
  const [isInvalidUserId, setInvalidUserId] = useState(false);
  const [isInvalidPassword, setInvalidPassword] = useState(false);
  const loginMutation = useLoginMutation();

  /**
   * 폼 입력값 제출시 유효성 검사 및 로그인
   */
  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const formData = Object.fromEntries(new FormData(e.target));
      loginMutation.mutate(formData);
    }
  };

  /**
   * 사용자 입력값 변경시 에러메세지 확인 및 초기화
   */
  //prettier-ignore
  const handleFormChange = ({ target: { validity, name } }: React.ChangeEvent<HTMLFormElement>) => {
    const { patternMismatch } = validity;
    if (!patternMismatch && name === ID)       setInvalidUserId(false);
    if (!patternMismatch && name === PASSWORD) setInvalidPassword(false);
  };

  /**
   * 인풋 포커스 아웃시 사용자 입력값 확인 후 유효성 실패 상태 변경
   */
  //prettier-ignore
  const handleInputBlur = ({ target: { validity, name } }: React.FocusEvent<HTMLInputElement>) => {
    const { patternMismatch } = validity;
    if (patternMismatch && name === ID)       setInvalidUserId(true);
    if (patternMismatch && name === PASSWORD) setInvalidPassword(true);
  };

  return (
    <>
      <S_Header>
        <Link href='/'>
          <S_Title>HAUS</S_Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </S_Header>
      <S_Form onSubmit={handleFormSubmit} onChange={handleFormChange}>
        <S_Label>아이디</S_Label>
        <S_Input
          type='text'
          name={ID}
          pattern='[0-9A-Za-z]{5,30}'
          onBlur={handleInputBlur}
          isInvalid={isInvalidUserId}
          required
        />
        {isInvalidUserId && <S_ErrorMessage>올바른 아이디 형식으로 입력해주세요</S_ErrorMessage>}
        <S_Label>비밀번호</S_Label>
        <S_Input
          type='password'
          name={PASSWORD}
          pattern='(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}'
          onBlur={handleInputBlur}
          isInvalid={isInvalidPassword}
          required
        />
        {isInvalidPassword && (
          <S_ErrorMessage>올바른 비밀번호 형식으로 입력해주세요</S_ErrorMessage>
        )}
        <S_Button disabled={isInvalidUserId || isInvalidPassword}>로그인</S_Button>
      </S_Form>
    </>
  );
}

const S_Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const S_Title = styled.a`
  font-size: 48px;
`;

const S_Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const S_Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
  margin-top: 16px;
`;

const S_Input = styled.input<{ isInvalid: boolean }>`
  margin-top: 8px;
  padding: 16px;
  background: ${(props) => (props.isInvalid ? '#FDEDEE' : '#f7f7fa')};
  border-radius: 12px;
`;

const S_Button = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;

const S_ErrorMessage = styled.span`
  margin: 8px 0 0 4px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
