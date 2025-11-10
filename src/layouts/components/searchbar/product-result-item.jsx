import Link from '@mui/material/Link';
import { Stack, Avatar, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

const ProductResultItem = ({ product, onClickItem, showPrice = true }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    sx={{ mb: 2, width: '100%' }}
    key={product.id}
  >
    <Avatar
      key={product.id}
      alt={product.name}
      src={product.images[0]}
      variant="rounded"
      sx={{
        mr: 1.5,
        width: 48,
        height: 48,
        flexShrink: 0,
        borderRadius: 1,
      }}
    />

    <Stack direction="column" flexGrow={1}>
      <Link
        href={onClickItem ? undefined : paths.product.details(product.slug)}
        onClick={onClickItem || undefined}
        // color={false ? 'primary' : 'textPrimary'}
        sx={{
          typography: 'body2',
          fontWeight: 'fontWeightSemiBold',
          cursor: 'pointer',
        }}
      >
        {product.name}
      </Link>
      <Stack direction="row" spacing={1}>
        <Typography
          component="span"
          sx={{
            typography: 'caption',
            fontWeight: 'fontWeightMedium',
          }}
        >
          {`مدل : ${product?.model} `}
        </Typography>
        {/* <Typography
            component="span"
            sx={{
              typography: 'caption',
              fontWeight: 'fontWeightMedium',
            }}
          >
            {`کد محصول : ${product?.code} `}
          </Typography> */}
      </Stack>
    </Stack>
    {showPrice ? (
      <Stack alignItems="end">
        <Typography
          typography="subtitle2"
          sx={{
            textDecoration: product.discount_price > 0 ? 'line-through' : undefined,
          }}
        >
          {fCurrency(product.price)}
        </Typography>
        {product.discount_price > 0 && (
          <Typography typography="subtitle2">{fCurrency(product.discount_price)}</Typography>
        )}
      </Stack>
    ) : (
      ''
    )}
  </Stack>
);

export default ProductResultItem;
