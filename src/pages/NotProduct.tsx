import Header from 'src/components/Header';
import styled from 'styled-components';

export default function NotProduct() {
  return (
    <>
      <Header />
      <S_Box>
        <p>상품이 존재하지 않습니다</p>
      </S_Box>
    </>
  );
}
const S_Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 240px;
`;
