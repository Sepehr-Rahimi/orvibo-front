'use client';

import { Stack } from '@mui/material';

import ProductCard from './product-card';
import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

export function ProductMessageList({ products, ...other }) {
  const checkout = useCheckoutContext();
  const renderList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      items={checkout.items}
      onAddCart={checkout.onAddToCart}
      disableActions={!product.stock}
    />
  ));

  return (
    <Stack direction="column" gap={1} display="grid" {...other}>
      {renderList}
    </Stack>
  );
}
