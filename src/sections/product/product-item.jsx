import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { useCheckoutContext } from '../checkout/context';
import { ProductImagePlaceHolder } from './product-skeleton';

// ----------------------------------------------------------------------

export function ProductItem({ product, sx }) {
  const checkout = useCheckoutContext();

  const {
    name,
    price,
    discount_price,
    summary,
    colors,
    sizes,
    stock,
    main_features,
    description,
    kinds,
    model,
    category_id,
    brand_id,
    brand,
    code,
    label,
    is_published,
    id,
    images,
    slug,
  } = product;

  const productStock = checkout.items.find((prod) => prod.id === id);

  const linkTo = paths.product.details(slug);

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      discount_price,
      colors: colors?.length ? colors[0] : undefined,
      sizes: sizes?.length ? sizes[0] : undefined,
      stock,
      kinds: kinds?.length ? kinds[0] : undefined,
      model,
      category_id,
      brand_id,
      code,
      label,
      quantity: 1,
      price: discount_price > 0 ? discount_price : price,
      coverUrl: images[0],
      slug,
    };
    try {
      checkout.onAddToCart(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = label && (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        position: 'absolute',
        zIndex: 9,
        top: { md: 16, xs: 10 },
        right: { md: 16, xs: 10 },
      }}
    >
      {label && (
        <Label variant="filled" color="info">
          {label}
        </Label>
      )}
      {/* {saleLabel.enabled && (
        <Label variant="filled" color="error">
          {saleLabel.content}
        </Label>
      )} */}
    </Stack>
  );

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!stock && (
        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          disabled={productStock?.quantity >= stock}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="solar:cart-plus-bold" width={24} />
        </Fab>
      )}

      <Tooltip title={!stock && 'ناموجود'} placement="bottom-end">
        {images[0] ? (
          <Image
            alt={name}
            src={images[0]}
            ratio="1/1"
            sx={{ borderRadius: 1.5, ...(!stock && { opacity: 0.48, filter: 'grayscale(1)' }) }}
          />
        ) : (
          <ProductImagePlaceHolder />
        )}
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={{ md: 2.5, xs: 1.5 }} sx={{ p: { md: 3, xs: 2 }, pt: { md: 2, xs: 1 } }}>
      <Stack>
        <Link
          component={RouterLink}
          href={linkTo}
          color="inherit"
          variant="subtitle2"
          noWrap
          sx={{ fontSize: { md: 14, xs: 12 } }}
        >
          {name}
        </Link>
        <Typography color="inherit" variant="caption" noWrap sx={{ fontSize: { md: 12, xs: 10 } }}>
          {brand?.name}
        </Typography>
      </Stack>

      <Stack
        spacing={{ md: 2, xs: 1 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <ColorPreview colors={colors} />

        <Stack
          direction="column-reverse"
          // flexWrap
          spacing={0.5}
          sx={{ typography: 'subtitle1', fontSize: 'min(3vw, 14px)', textWrap: 'nowrap' }}
        >
          {discount_price > 0 ? (
            <>
              <Box component="span">{fCurrency(discount_price)}</Box>
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(price)}
              </Box>
            </>
          ) : (
            <Box component="span">{fCurrency(price)}</Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ '&:hover .add-cart-btn': { opacity: 1 }, width: 1, ...sx }}>
      {renderLabels}

      {renderImg}

      {renderContent}
    </Card>
  );
}
