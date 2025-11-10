import { useForm } from 'react-hook-form';
import React, { useCallback } from 'react';

import { Box, Link, Stack, Button, Typography } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

const ProductCard = ({ product, items, onAddCart, disableActions }) => {
  const {
    id,
    name,
    price,
    discount_price,
    summary,
    colors,
    sizes,
    stock,
    images,
    kinds,
    model,
    category_id,
    brand_id,
    brand,
    code,
    slug,
    label,
    is_published,
  } = product;
  const brandName = product.brand.name;
  const category = product.category.name;

  const totalQuantity = Array.isArray(items)
    ? items.filter((item) => item.id === id).reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const isMaxQuantity = totalQuantity >= stock;

  const defaultValues = {
    id,
    name,
    coverUrl: images?.length ? images[0] : undefined,
    stock,
    colors: colors?.length ? colors[0] : undefined,
    kinds: kinds?.length ? kinds[0] : undefined,
    size: sizes?.length ? sizes[0] : undefined,
    quantity: stock < 1 ? 0 : 1,
  };

  const methods = useForm({ defaultValues });

  const { watch } = methods;

  const values = watch();

  console.log('watch value :', values);

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        discount_price,
        slug,
        code,
        model,
        colors: values.colors,
        price: discount_price > 0 ? discount_price : price,
        subtotal: (discount_price > 0 ? discount_price : price) * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values, discount_price, code, model, slug, price]);

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disableActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        افزودن
      </Button>
    </Stack>
  );

  const renderPrice = (
    <Box sx={{ typography: 'body1' }}>
      {discount_price > 0 ? (
        <Stack direction="column">
          <Box
            component="span"
            sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
          >
            {fCurrency(price)}
          </Box>
          {fCurrency(discount_price)}
        </Stack>
      ) : (
        fCurrency(price)
      )}
    </Box>
  );

  const renderColorOptions = <ColorPreview colors={colors} />;

  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      spacing={2}
      borderBottom={1}
      borderColor="lightgray"
      py={2}
    >
      <Box flex={1} position="relative">
        <Image fill src={`${images[0]}`} />
      </Box>
      <Stack direction="column" flex={3} spacing={1}>
        <Link href={`${CONFIG.site.basePath}/products/${slug}`} underline="none">
          <Typography variant="inherit">{name}</Typography>
        </Link>
        <Typography variant="subtitle2">{category}</Typography>
        <Typography variant="body2">{summary}</Typography>
      </Stack>
      <Stack direction="column" flex={1} spacing={1}>
        <Typography flex={1} variant="subtitle2">
          {brandName}
        </Typography>
        <Box display="flex" gap={1}>
          {renderColorOptions}
        </Box>
        {renderPrice}
        {renderActions}
      </Stack>
    </Stack>
  );
};

export default ProductCard;
