import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import { ColorPreview } from 'src/components/color-utils';
import { Image } from 'src/components/image';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { IncrementerButton } from 'src/sections/product/components/incrementer-button';
import { fCurrency } from 'src/utils/format-number';

export const OrderItemCard = ({ item }) => {
  const i = 0;
  // const itemCurrentPrice = item.discount_price > 0 ? item.discount_price : item.price
  return (
    <Box
      sx={{
        borderRadius: 2,
        px: 2,
        py: 2,
        mt: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* --- Product Info Section --- */}
      <Stack direction="row" spacing={2}>
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
            width: 90,
            height: 90,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Image
            alt={item.product.name}
            src={item.product.images[0]}
            ratio="1/1"
            sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          />
        </Box>

        {/* Details */}
        <Stack spacing={1.1} flex={1} justifyContent="center" alignItems="start">
          <Link
            component={RouterLink}
            href={paths.product.details(item.product.slug)}
            color="inherit"
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              lineHeight: 1.4,
            }}
          >
            {item.product.name}
          </Link>

          <ColorPreview colors={[item.color]} />

          <Stack justifyContent="space-between" direction="row" width={1}>
            {item.discount_price > 0 ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight={600}>{fCurrency(item.discount_price)}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {fCurrency(item.price)}
                </Typography>
              </Stack>
            ) : (
              <Typography fontWeight={600}>{fCurrency(item.price)}</Typography>
            )}
            <Typography fontWeight={600} variant="subtitle2">{`x${item.quantity}`}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* --- Bottom Section: Quantity & Actions --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          قیمت کل:{' '}
          <Typography component="span" fontWeight={300} color="text.primary">
            {fCurrency(item.price * item.quantity)}
          </Typography>
        </Typography>

        {/* <Stack direction="row" alignItems="center" spacing={1}>
          <IncrementerButton
            quantity={product.quantity}
            onDecrease={() => onDecreaseQuantity(product.cartItemId)}
            onIncrease={() => onIncreaseQuantity(product.cartItemId)}
            disabledDecrease={product.quantity <= 1}
            disabledIncrease={product.quantity >= product.stock}
          />
          <IconButton
            onClick={() => onDelete(product.cartItemId)}
            size="small"
            sx={{
              ml: 0.5,
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Stack> */}
      </Stack>
    </Box>
  );
};
