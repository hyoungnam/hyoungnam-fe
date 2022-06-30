import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Login from './index';

const mockLogin = jest.fn();

jest.mock('./useLoginMutation', () => ({
  useLoginMutation: () => ({ mutate: mockLogin }),
}));

const SCREEN_TEXT_ID = '아이디';
const SCREEN_TEXT_PASSWORD = '비밀번호';
const SCREEN_TEXT_LOGIN = '로그인';

describe('로그인 폼 테스트', () => {
  beforeEach(() => {
    render(<Login />);
  });

  describe('유효하지 않은 아이디 값이 입력된 경우', () => {
    // 영문 대문자와 영문 소문자, 숫자가 세 가지 중 일부가 포함되어야 하며, 5자 이상 30자 이하로 작성
    it('에러 메세지를 화면에 표시한다', () => {
      //given
      const idInput = screen.getByLabelText(SCREEN_TEXT_ID);
      const id = 'test';

      //when
      fireEvent.change(idInput, { target: { value: id } });
      fireEvent.blur(idInput);

      //then
      const errorMessage = '올바른 아이디 형식으로 입력해주세요';
      expect(screen.getByText(errorMessage)).toHaveTextContent(errorMessage);
    });
    it('로그인 버튼이 비활성화된다', () => {
      //given
      const idInput = screen.getByLabelText(SCREEN_TEXT_ID);
      const id = 'test';

      //when
      fireEvent.change(idInput, { target: { value: id } });
      fireEvent.blur(idInput);

      //then
      expect(screen.getByText(SCREEN_TEXT_LOGIN)).toBeDisabled();
    });
  });

  describe('유효하지 않은 비밀번호 값이 입력된 경우', () => {
    // 영문 대문자, 영문 소문자와 숫자가 모두 포함되어야 하며, 8자 이상 30자 이하로 작성

    it('에러 메세지를 화면에 표시한다', () => {
      //given
      const passwordInput = screen.getByLabelText(SCREEN_TEXT_PASSWORD);
      const password = 'test1q';

      //when
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.blur(passwordInput);

      //then
      const errorMessage = '올바른 비밀번호 형식으로 입력해주세요';
      expect(screen.getByText(errorMessage)).toHaveTextContent(errorMessage);
    });

    it('로그인 버튼이 비활성화된다', () => {
      //given
      const passwordInput = screen.getByLabelText(SCREEN_TEXT_PASSWORD);
      const password = 'test1q';

      //when
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.blur(passwordInput);

      //then
      expect(screen.getByText(SCREEN_TEXT_LOGIN)).toBeDisabled();
    });
  });

  describe('유효한 아이디와 비밀번호 그리고 로그인 버튼을 클릭한 경우', () => {
    it('로그인 함수가 호출된다', () => {
      //given
      const idInput = screen.getByLabelText(SCREEN_TEXT_ID);
      const passwordInput = screen.getByLabelText(SCREEN_TEXT_PASSWORD);
      const loginButton = screen.getByText(SCREEN_TEXT_LOGIN);
      const [id, password] = ['testid', '1Qqwe12!'];

      //when
      fireEvent.change(idInput, { target: { value: id } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(loginButton);

      //then
      expect(mockLogin).toBeCalled();
    });
  });
});
