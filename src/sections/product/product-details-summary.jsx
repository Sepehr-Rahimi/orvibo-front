import { useEffect, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fCurrency, fIrr } from 'src/utils/format-number';
// import { trackMatomoEvent } from 'src/utils/helper';

import { getCurrentPrice } from 'src/utils/helper';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { ColorPicker } from 'src/components/color-utils';
import { VariantPickup } from 'src/components/variant-pickup/variant-pickup';

import { IncrementerButton } from './components/incrementer-button';

// ----------------------------------------------------------------------

export function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  // disableActions,
  // disableVariant,
  ...other
}) {
  const router = useRouter();

  const {
    id,
    name,
    // price,
    // discount_price,
    summary,
    // colors,
    // sizes,
    // stock,
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
    is_published,
    // weight,
    variants,
  } = product;

  const theme = useTheme();
  // const isMaxQuantity =
  //   !!items?.length &&
  //   items.filter((item) => item.id === id)?.map((item) => item.quantity)[0] >= stock;

  const [choosedVariant, setChoosedVariant] = useState(variants[0]);

  const totalQuantity = Array.isArray(items)
    ? items
        .filter((item) => item.variant_id === choosedVariant.id)
        .reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // console.log(totalQuantity);
  // console.log(items);

  // const isMaxQuantity = totalQuantity >= choosedVariant.stock;

  const defaultValues = {
    id,
    name,
    variant_id: choosedVariant.id,
    coverUrl: images?.length ? images[0] : undefined,
    stock: choosedVariant.stock,
    color: choosedVariant.color,
    kind: choosedVariant?.kind,
    size: choosedVariant?.size,
    quantity: choosedVariant.stock < 1 ? 0 : 1,
  };

  const methods = useForm({ defaultValues });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const buyDisableCases =
    totalQuantity >= choosedVariant?.stock || values?.quantity <= 0 || !choosedVariant?.stock;

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    try {
      onAddCart?.({
        ...data,
        variant_id: choosedVariant.id,
        slug,
        discount_price: choosedVariant.discount_price,
        kind: choosedVariant?.kind,
        code,
        model,
        color: choosedVariant.color,
        price: getCurrentPrice(choosedVariant.price, choosedVariant.discount_price),
        subtotal:
          getCurrentPrice(choosedVariant.price, choosedVariant.discount_price) * data.quantity,
      });
      // trackMatomoEvent('add-to-cart', { productName: product.name, productId: product.id });
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
        discount_price: choosedVariant.discount_price,
        variant_id: choosedVariant.id,
        kind: choosedVariant.kind,
        code,
        model,
        slug,
        color: choosedVariant.color,
        price: getCurrentPrice(choosedVariant.price, choosedVariant.discount_price),
        subtotal:
          getCurrentPrice(choosedVariant.price, choosedVariant.discount_price) *
          choosedVariant.quantity,
      });

      // trackMatomoEvent('add-to-cart', { productName: product.name, productId: product.id });

      if (totalQuantity + values.quantity + values.quantity > choosedVariant.stock)
        setValue('quantity', 0);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAddCart, values, code, model, slug, totalQuantity, setValue, choosedVariant]);

  const renderPrice = (
    <Stack>
      <Box sx={{ typography: 'h5' }}>
        {choosedVariant.discount_price > 0 ? (
          <>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
            >
              {fCurrency(choosedVariant.price)}
            </Box>
            {` - ${fCurrency(choosedVariant.discount_price)}`}
          </>
        ) : (
          fCurrency(choosedVariant.price)
        )}
      </Box>
      <Box sx={{ typography: 'subtitle2' }}>معادل {fIrr(choosedVariant?.irrExchange)}</Box>
    </Stack>
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
      <Typography variant="subtitle2" sx={{ flexGrow: 1, mr: 2 }}>
        رنگ
      </Typography>

      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          // <ColorPicker
          //   colors={colors}
          //   selected={field.value}
          //   onSelectColor={(color) => field.onChange(color)}
          //   limit={4}
          // />
          <VariantPickup
            choosedVariant={choosedVariant}
            setChoosedVariant={(variant) => {
              setChoosedVariant(variant);
              field.onChange(variant.color);
            }}
            variants={variants}
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
        {choosedVariant.sizes?.map((size) => (
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
          disabledIncrease={values.quantity >= choosedVariant.stock - totalQuantity}
          onIncrease={() => {
            setValue('quantity', values.quantity + 1);
          }}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        {/* <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          موجود: {choosedVariant.stock}
        </Typography> */}
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        className="add-to-cart-btn"
        fullWidth
        disabled={buyDisableCases}
        size="large"
        color="inherit"
        variant="outlined"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        اضافه به سبد خرید
      </Button>

      <Button
        className="add-to-cart-btn"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={buyDisableCases}
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
        // color:
        //   (choosedVariant.stock === 0 && 'error.main') ||
        //   (choosedVariant.stock > 0 && choosedVariant.stock < 5 && 'warning.main') ||
        //   'success.main',
      }}
    >
      {
        choosedVariant.stock === 0 && 'ناموجود'
        // (choosedVariant.stock > 0 && choosedVariant.stock < 5 && 'تعداد محدود')
      }
    </Box>
  );

  // const renderProperties = (
  //   <Box my={2}>{weight && <Typography variant="subtitle2">وزن : {weight}kg</Typography>}</Box>
  // );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          {renderInventoryType}

          <Stack>
            <Typography variant="h5">
              {name} {model?.trim()?.length > 0 && `| ${model}`}
            </Typography>
            {/* <Link component={RouterLink} href={paths.product.byBrand(brand?.name)}>
              {brand?.name}
            </Link> */}
            {/* {renderProperties} */}
          </Stack>

          {/* {renderRating} */}

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderColorOptions}

        {/* {kinds?.length ? renderKindOptions : null} */}

        {/* {sizes?.length ? renderSizeOptions : null} */}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderPrice}

        {renderActions}

        {/* {renderShare} */}
      </Stack>
    </Form>
  );
}
