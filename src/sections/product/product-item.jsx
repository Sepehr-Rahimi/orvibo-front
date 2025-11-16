import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fNumber, fCurrency } from 'src/utils/format-number';
// import { trackMatomoEvent } from 'src/utils/helper';

import { useState } from 'react';

import { getPriceRange, getCurrentPrice } from 'src/utils/helper';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';
import { VariantPickup } from 'src/components/variant-pickup/variant-pickup';

import { useCheckoutContext } from '../checkout/context';
import { ProductImagePlaceHolder } from './product-skeleton';

// ----------------------------------------------------------------------

export function ProductItem({ product, sx }) {
  const checkout = useCheckoutContext();

  const {
    name,
    // price,
    // discount_price,
    summary,
    // colors,
    // sizes,
    // stock,
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
    variants,
  } = product;

  const productStock = checkout.items.find((prod) => prod.id === id);

  const linkTo = paths.product.details(slug);

  const prices = variants.map((singleVariant) =>
    getCurrentPrice(singleVariant.price, singleVariant.discount_price)
  );
  // console.log(prices);

  const priceRange = getPriceRange(prices);
  // console.log(priceRange);

  const colors = [...new Set(variants.map((v) => v.color))];

  // const handleAddCart = async () => {
  // if (window._mtm) {
  //   // console.log(window._mtm);
  //   window._mtm.push({
  //     event: 'product-view',
  //     productName: product.name,
  //     productId: product.id,
  //   });
  // }
  // trackMatomoEvent('add-to-cart', { productName: product.name, productId: product.id });
  //   const newProduct = {
  //     id,
  //     name,
  //     discount_price: choosedVariant?.discount_price,
  //     colors: choosedVariant.color,
  //     sizes: choosedVariant?.sizes?.length ? choosedVariant?.sizes[0] : undefined,
  //     stock: choosedVariant.stock,
  //     kinds: kinds?.length ? kinds[0] : undefined,
  //     model,
  //     category_id,
  //     brand_id,
  //     code,
  //     label,
  //     quantity: 1,
  //     price:
  //       choosedVariant.discount_price > 0 ? choosedVariant.discount_price : choosedVariant.price,
  //     coverUrl: images[0],
  //     slug,
  //     variant_id: choosedVariant.id,
  //   };
  //   try {
  //     checkout.onAddToCart(newProduct);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [choosedVariant, setChoosedVariant] = useState({ ...variants[0] });

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
      {/* {!!choosedVariant.stock && (
        <Fab
          color="warning"
          size="medium"
          className="add-to-cart-btn"
          onClick={handleAddCart}
          disabled={productStock?.quantity >= choosedVariant.stock}
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
      )} */}

      {/* <Tooltip title={!choosedVariant.stock && 'ناموجود'} placement="bottom-end"> */}
      {images[0] ? (
        <Image
          alt={name}
          src={images[0]}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            // ...(!choosedVariant.stock && { opacity: 0.48, filter: 'grayscale(1)' }),
          }}
        />
      ) : (
        <ProductImagePlaceHolder />
      )}
      {/* </Tooltip> */}
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
        {/* <ColorPreview colors={colors} /> */}
        <ColorPreview colors={colors} />

        <Stack
          direction="column-reverse"
          // flexWrap
          spacing={0.5}
          sx={{ typography: 'subtitle1', fontSize: 'min(3vw, 14px)', textWrap: 'nowrap' }}
        >
          {/* {choosedVariant.discount_price > 0 ? (
            <>
              <Box component="span">{fCurrency(choosedVariant.discount_price)}</Box>
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(choosedVariant.price)}
              </Box>
            </>
          ) : (
            <Box component="span">{fCurrency(choosedVariant.price)}</Box>
          )} */}
          <Box component="span">{`${fNumber(priceRange[0])} - ${fNumber(priceRange[1])}`}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ '&:hover .add-to-cart-btn': { opacity: 1 }, width: 1, ...sx }}>
      {renderLabels}

      {renderImg}

      {renderContent}
    </Card>
  );
}
