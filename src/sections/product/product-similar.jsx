import React from 'react';

import { Box } from '@mui/material';

import { EmptyContent } from 'src/components/empty-content';

import SimilarProductsCarousel from './product-similar-crousel';

export const ProductSimilar = ({ products }) => {
  const isEmpty = !products || !products.length > 0;
  // console.log(products);
  const returnEmpty = <EmptyContent />;
  // const returnProducts = isEmpty
  //   ? null
  //   : products.map((prod) => <ProductItem product={prod} key={prod?.id} />);
  return <Box>{isEmpty ? returnEmpty : <SimilarProductsCarousel products={products} />}</Box>;
};
