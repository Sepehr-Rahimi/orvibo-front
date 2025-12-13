import React from 'react';

import { Box } from '@mui/material';

import { OrderItemCard } from './order-item-card';
import { OrderItemCardEn } from './order-item-en-card';

export const OrderItemsMobileListEn = ({ items }) => (
  <Box mb={2}>
    {items.map((item) => (
      <OrderItemCardEn item={item} />
    ))}
  </Box>
);
