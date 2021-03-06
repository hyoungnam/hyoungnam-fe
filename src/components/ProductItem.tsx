import Image from 'next/image';
import Link from 'next/link';
import { numberWithCommas } from 'src/utilities';
import styled from 'styled-components';

import { Product } from '../types/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { id, name, thumbnail, price } }: ProductItemProps) => (
  <Link href={`products/${id}`}>
    <S_Anchor>
      <Image
        src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
        alt={`Product-${id}`}
        loading='lazy'
        width='180px'
        height='180px'
      />
      <S_Name>{name}</S_Name>
      <S_Price>{numberWithCommas(price)}원</S_Price>
    </S_Anchor>
  </Link>
);

export default ProductItem;

const S_Anchor = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const S_Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const S_Price = styled.div`
  margin-top: 4px;
`;
