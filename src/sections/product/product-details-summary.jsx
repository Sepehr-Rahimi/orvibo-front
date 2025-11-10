import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { ColorPicker } from 'src/components/color-utils';

import { IncrementerButton } from './components/incrementer-button';

// ----------------------------------------------------------------------

export function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disableActions,
  ...other
}) {
  const router = useRouter();

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
    category,
    code,
    label,
    slug,
    is_publishedو,
  } = product;

  // const isMaxQuantity =
  //   !!items?.length &&
  //   items.filter((item) => item.id === id)?.map((item) => item.quantity)[0] >= stock;

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

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      onAddCart?.({
        ...data,
        slug,
        discount_price,
        code,
        model,
        colors: values.colors,
        price: discount_price > 0 ? discount_price : price,
        subtotal: (discount_price > 0 ? discount_price : price) * data.quantity,
      });
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        discount_price,
        code,
        model,
        slug,
        colors: values.colors,
        price: discount_price > 0 ? discount_price : price,
        subtotal: (discount_price > 0 ? discount_price : price) * values.quantity,
      });

      if (totalQuantity + values.quantity + values.quantity > stock) setValue('quantity', 0);
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values, discount_price, code, model, price, stock, slug, setValue, totalQuantity]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {discount_price > 0 ? (
        <>
          <Box
            component="span"
            sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
          >
            {fCurrency(price)}
          </Box>
          {fCurrency(discount_price)}
        </>
      ) : (
        fCurrency(price)
      )}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
      >
        <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
        مقایسه
      </Link>

      <Link
        variant="subtitle2"
        sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
      >
        <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
        مورد علاقه
      </Link>

      <Link
        variant="subtitle2"
        sx={{ color: 'text.secondary', display: 'inline-flex', alignItems: 'center' }}
      >
        <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
        اشتراک گذاری
      </Link>
    </Stack>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        رنگ
      </Typography>

      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color)}
            limit={4}
          />
        )}
      />
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        اندازه
      </Typography>

      <Field.Select
        name="size"
        size="small"
        // helperText={
        //   <Link underline="always" color="textPrimary">
        //     Size chart
        //   </Link>
        // }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: { mx: 0, mt: 1, textAlign: 'right' },
        }}
      >
        {sizes?.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Field.Select>
    </Stack>
  );
  const renderKindOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        انواع
      </Typography>

      <Field.Select
        name="kinds"
        size="small"
        // helperText={
        //   <Link underline="always" color="textPrimary">
        //     Size chart
        //   </Link>
        // }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: { mx: 0, mt: 1, textAlign: 'right' },
        }}
      >
        {kinds?.map((kind) => (
          <MenuItem key={kind} value={kind}>
            {kind}
          </MenuItem>
        ))}
      </Field.Select>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        تعداد
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= stock - totalQuantity}
          onIncrease={() => {
            setValue('quantity', values.quantity + 1);
          }}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          موجود: {stock}
        </Typography>
      </Stack>
    </Stack>
  );

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
        اضافه به سبد خرید
      </Button>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={disableActions || isMaxQuantity}
      >
        خرید
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {summary}
    </Typography>
  );

  // const renderRating = (
  //   <Stack direction="row" alignItems="center" sx={{ color: 'text.disabled', typography: 'body2' }}>
  //     <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
  //     {`(${fShortenNumber(totalReviews)} نظر ثبت شده)`}
  //   </Stack>
  // );

  const renderLabels = label && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {label && <Label color="info">{label}</Label>}
      {/* {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>} */}
    </Stack>
  );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (stock === 0 && 'error.main') ||
          (stock > 0 && stock < 5 && 'warning.main') ||
          'success.main',
      }}
    >
      {(stock === 0 && 'ناموجود') || (stock > 0 && stock < 5 && 'تعداد محدود')}
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Stack>
            <Typography variant="h5">
              {name} | {model}
            </Typography>
            <Link component={RouterLink} href={paths.product.byBrand(brand?.name)}>
              {brand?.name}
            </Link>
          </Stack>

          {/* {renderRating} */}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {colors?.length ? renderColorOptions : null}

        {kinds?.length ? renderKindOptions : null}

        {sizes?.length ? renderSizeOptions : null}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}

        {/* {renderShare} */}
      </Stack>
    </Form>
  );
}
