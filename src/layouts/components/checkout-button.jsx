import './checkoutbutton.css';

import React, { useEffect, useRef, useState } from 'react';

import { Badge, Box, Button, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from 'src/sections/checkout/context';

export const CheckoutButton = () => {
  const { totalItems } = useCheckoutContext();
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 400);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);
  return (
    <Button
      href={`${paths.product.checkout}`}
      variant="outlined" // minimal style
      color="inherit"
      sx={{
        minWidth: 0,
        padding: 1,
        borderRadius: '50%',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
      }}
    >
      <Badge
        badgeContent={
          <>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {totalItems}
            </Box>
            {pulseAnimation && <span className="badge-border-pulse" />}
          </>
        }
        variant="standard"
        color="error"
      >
        <Iconify icon="solar:cart-3-bold" width={24} height={24} />
      </Badge>
    </Button>
  );
};
