import React from 'react';

import { Box } from '@mui/material';

import { OrderItemCard } from './order-item-card';

export const OrderItemsMobileList = ({ items }) => (
  <Box mb={2}>
    {items.map((item) => (
      <OrderItemCard item={item} />
    ))}
  </Box>
);
