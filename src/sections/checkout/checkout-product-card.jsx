import React from 'react';

import { Box, Card, Link, Stack, Divider, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';
// import { trackMatomoEvent } from 'src/utils/helper';

import { getCurrentPrice } from 'src/utils/helper';

import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { IncrementerButton } from '../product/components/incrementer-button';

export const CheckoutProductCard = ({
  product,
  onDelete,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => {
  const productCurrentPrice = getCurrentPrice(product.discount_price, product.price);

  const productColorName = PRODUCT_COLOR_NAME_OPTIONS.find(
    (option) => option.value === product.color
  ).label;

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
            alt={product.name}
            src={product.coverUrl}
            ratio="1/1"
            sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          />
        </Box>

        {/* Details */}
        <Stack spacing={1.1} flex={1} justifyContent="center" alignItems="start">
          <Link
            component={RouterLink}
            href={paths.product.details(product.slug)}
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
            {product.name}
          </Link>
          <Stack direction="row">
            <ColorPreview colors={[product.color]} />
            <Typography variant="caption" mx="2px">
              {' '}
              {productColorName}{' '}
            </Typography>
            {product.kind && <Typography variant="subtitle2"> - {product.kind}</Typography>}
          </Stack>

          {product.discount_price > 0 ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontWeight={600}>{fCurrency(product.discount_price)}</Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {fCurrency(product.price)}
              </Typography>
            </Stack>
          ) : (
            <Typography fontWeight={600}>{fCurrency(product.price)}</Typography>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* --- Bottom Section: Quantity & Actions --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          قیمت کل:{' '}
          <Typography component="span" fontWeight={400} color="text.primary" dir="ltr">
            {fCurrency(productCurrentPrice * product.quantity)}
          </Typography>
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IncrementerButton
            quantity={product.quantity}
            onDecrease={() => onDecreaseQuantity(product.variant_id)}
            onIncrease={() => onIncreaseQuantity(product.variant_id)}
            disabledDecrease={product.quantity <= 1}
            disabledIncrease={product.quantity >= product.stock}
          />
          <IconButton
            className="delete-from-cart"
            onClick={() => {
              // trackMatomoEvent('delete-from-cart', {
              //   productName: product.name,
              //   productId: product.id,
              // });
              onDelete(product.variant_id);
            }}
            size="small"
            sx={{
              ml: 0.5,
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
