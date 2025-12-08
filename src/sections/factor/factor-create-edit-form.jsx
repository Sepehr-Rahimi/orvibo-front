'use client';

import React, { useState } from 'react';

import {
  Box,
  Card,
  Input,
  Table,
  Stack,
  Button,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { calculatePercentage } from 'src/utils/helper';
import { fCurrency, fIrr } from 'src/utils/format-number';

import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';
import { updateOrder, createAdminOrder } from 'src/actions/orders';
import ProductResultItem from 'src/layouts/components/searchbar/product-result-item';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { useFactorForm } from './hooks/useFactorForm';
import { AddressItem, AddressNewEditForm } from '../address';

export const FactorCreateEditForm = ({ order, userId }) => {
  const router = useRouter();

  const factorState = useFactorForm(order);
  const { factorCosts } = factorState;
  const addressForm = useBoolean();

  const colorName = (hex) =>
    PRODUCT_COLOR_NAME_OPTIONS.find((option) => option.value === hex).label;

  const handleSetDiscountPercentage = (value) => {
    if (value > 100 || (!Number(value) && value)) {
      factorState.setErrorMessage('درصد وارد شده صحیح نمیباشد');
      return;
    }
    factorState.setDiscount(value);
    factorState.setErrorMessage('');
  };

  const usingCreatedAddress = (namesAddress) => {
    factorState.setSearchAddressInput(namesAddress);
  };

  const [loading, setLoading] = useState(false);

  const [addressInfo, setAddressInfo] = useState({});

  const businessProfit = calculatePercentage(
    factorCosts.businessProfit,
    factorState.productsPrice
  ).toFixed(2);
  const shippingCost = calculatePercentage(factorCosts.shipping, factorState.productsPrice).toFixed(
    2
  );
  const guarantee = calculatePercentage(factorCosts.guarantee, factorState.productsPrice).toFixed(
    2
  );
  const services = calculatePercentage(factorCosts.services, factorState.productsPrice).toFixed(2);

  return (
    <Stack direction="column" gap={3}>
      {/* اطلاعات مشتری */}
      <Card
        sx={{
          px: 4,
          py: 2,
        }}
      >
        <Typography variant="h5">اطلاعات مشتری</Typography>
        <Button
          sx={{ my: 2 }}
          size="small"
          color="primary"
          onClick={() => {
            setAddressInfo({});
            addressForm.onTrue();
          }}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          افزودن
        </Button>
        <Box>
          <Input
            fullWidth
            placeholder="جست و جو..."
            onChange={(e) => factorState.setSearchAddressInput(e.target.value)}
            value={factorState.searchAddressInput}
          />
          {factorState.addressResult && (
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {factorState.addressResult.map((address) => (
                <AddressItem
                  key={address.id}
                  address={address}
                  action={
                    <Stack gap={2}>
                      <Button
                        onClick={() => {
                          factorState.setSelectedAddress(address);
                          factorState.setSearchAddressInput('');
                        }}
                      >
                        انتخاب
                      </Button>
                      <Button
                        onClick={() => {
                          setAddressInfo({ ...address });
                          addressForm.onTrue();
                        }}
                        disabled={userId !== address.user_id}
                      >
                        ویرایش
                      </Button>
                    </Stack>
                  }
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: (theme) => theme.customShadows.card,
                  }}
                />
              ))}
              {factorState.addressEmpty && (
                <Box py={2} px={3}>
                  <Typography sx={{ margin: 'auto' }} variant="body2">
                    آدرسی با اسم {factorState.searchAddressInput} پیدا نشد
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {factorState.errorMessage && (
          <Box bgcolor="whitesmoke" sx={{ borderRadius: 1, px: 2, py: 1 }}>
            <Typography variant="caption" color="red">
              {factorState.errorMessage}
            </Typography>
          </Box>
        )}
        <Typography variant="h5">افزودن محصول جدید</Typography>
        <Input
          placeholder="جست و جو محصول"
          onInput={(e) => factorState.setSearchInput(e.target.value)}
          value={factorState.searchInput}
        />
        <Box component="ul" sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {factorState.searchItems.map((product) => (
            <Box component="li" key={`${product?.id}`} sx={{ display: 'flex' }}>
              <ProductResultItem
                onClickItem={() => {
                  // add product object (with variants) — the hook will pick a default available variant
                  factorState.handleAddItemFromProduct(product);
                }}
                product={product}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Scrollbar autoHide={false}>
        <Table sx={{ minWidth: 720 }}>
          <TableHead>
            <TableRow>
              <TableCell>نام محصول</TableCell>
              <TableCell align="center">تعداد</TableCell>
              <TableCell aligh="center">انتخاب واریانت</TableCell>
              <TableCell align="center">قیمت واحد</TableCell>
              <TableCell align="center">جمع</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {factorState.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body2">{item.name}</Typography>
                </TableCell>

                <TableCell align="center">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      factorState.handleChangeQuantity(index, Number(e.target.value))
                    }
                    sx={{ width: 80 }}
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    select
                    value={item.selectedVariantId}
                    onChange={(e) => factorState.handleChangeVariant(index, Number(e.target.value))}
                    sx={{ minWidth: 200 }}
                  >
                    {item.variants.map((variant) => {
                      const isDisabled = factorState.isVariantUsedElsewhere(
                        item.product_id,
                        variant.id,
                        index
                      );
                      return (
                        <MenuItem key={variant.id} value={variant.id} disabled={isDisabled}>
                          <Box
                            sx={{
                              display: 'inline-block',
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              backgroundColor: variant.color || '#ccc',
                              mr: 1,
                            }}
                          />
                          {variant.kind || variant.color}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="body2">{fCurrency(item.price)}</Typography>
                </TableCell>

                <TableCell align="right">{fCurrency(item.quantity * item.price)}</TableCell>

                <TableCell>
                  <IconButton onClick={() => factorState.handleRemoveItem(index)}>
                    <Iconify width={20} icon="solar:close-square-broken" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      {order && (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => factorState.setCheckRevalidatePrice(event.target.checked)}
                defaultValue={factorState.checkRevalidatePrice}
              />
            }
            label="بروزرسانی قیمت ها "
          />
        </Box>
      )}

      <Box display="flex" flexDirection="row" gap={2}>
        <Typography>درصد تخفیف</Typography>
        <Input
          placeholder="0"
          value={factorState.discountPercentage}
          onChange={(e) => {
            handleSetDiscountPercentage(e.target.value);
            // factorState.handleSetDiscountPercentage(e.target?.value);
          }}
        />
      </Box>

      <Box display="flex" flexDirection="row" gap={2}>
        <Typography>سود بازرگانی</Typography>
        <Input
          placeholder="0"
          value={factorCosts.businessProfit}
          onChange={(e) => {
            factorState.handleChangeFactorCosts('businessProfit', e.target?.value);
          }}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <Typography>گارانتی</Typography>
        <Input
          placeholder="0"
          value={factorCosts.guarantee}
          onChange={(e) => {
            factorState.handleChangeFactorCosts('guarantee', e.target?.value);
          }}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <Typography>خدمات نصب و راه اندازی</Typography>
        <Input
          placeholder="0"
          value={factorCosts.services}
          onChange={(e) => {
            factorState.handleChangeFactorCosts('services', e.target?.value);
          }}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={2}>
        <Typography>هزینه حمل و ترخیص</Typography>
        <Input
          placeholder="0"
          value={factorCosts.shipping}
          onChange={(e) => {
            factorState.handleChangeFactorCosts('shipping', e.target?.value);
          }}
        />
      </Box>

      {/* factor preview */}
      {factorState.selectedAddress && (
        <Card
          sx={{
            px: 3,
            py: 2,
            display: 'flex',
            gap: 2,
            maxWidth: 600,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h7">
              قیمت نهایی محصولات : {fCurrency(factorState.productsPrice)}
            </Typography>
            <Typography variant="h7">
              سود بازرگانی : {`${fCurrency(businessProfit || 0)}`}
            </Typography>
            <Typography variant="h7">حمل و ترخیص : {`${fCurrency(shippingCost || 0)}`}</Typography>
            <Typography variant="h7">
              خدمات نصب و راه اندازی : {`${fCurrency(services || 0)}`}
            </Typography>
            <Typography variant="h7">گارانتی : {`${fCurrency(guarantee || 0)}`}</Typography>
            <Typography variant="h7">
              درصد تخفیف : {`%${factorState.discountPercentage || 0}`}
            </Typography>
            <Typography variant="h7">
              {' '}
              مبلغ تخفیف: {fCurrency(factorState.discountAmount)}
            </Typography>
            <Typography variant="h6">قیمت نهایی : {fCurrency(factorState.finalPrice)}</Typography>
            <Typography variant="h7">معادل تومانی : {fIrr(factorState.irrPrice)}</Typography>
          </Box>
          <Box borderLeft={1} px={3}>
            <Typography>اطلاعات مشتری : </Typography>
            {factorState.selectedAddress && <AddressItem address={factorState?.selectedAddress} />}
          </Box>
        </Card>
      )}

      <Button
        disabled={loading}
        variant="contained"
        sx={{ py: 1 }}
        onClick={() => {
          if (!factorState.isValidForSubmit()) {
            return;
          }
          setLoading(true);
          const payloadItems = factorState.items.map((item) => ({
            product_id: item.product_id,
            variant_id: item.selectedVariantId,
            quantity: item.quantity,
            price: item.price,
          }));

          if (order?.id) {
            updateOrder({
              id: order.id,
              total_cost: factorState.finalPrice,
              items: payloadItems,
              address_id: factorState.selectedAddress.id.toString(),
              type_of_delivery: 0,
              discount_amount: factorState.discountAmount,
              servicesPercentage: factorCosts.services,
              guaranteePercentage: factorCosts.guarantee,
              businessProfitPercentage: factorCosts.businessProfit,
              shippingPercentage: factorCosts.shipping,
            })
              .then((res) => {
                setLoading(false);
                router.prefetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}${paths.adminDashboard.order.details(order.id)}`
                );
                router.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}${paths.adminDashboard.order.details(order.id)}`
                );
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          } else {
            createAdminOrder({
              address_id: factorState.selectedAddress.id,
              discount_amount: factorState.discountAmount,
              items: payloadItems,
              servicesPercentage: factorCosts.services,
              guaranteePercentage: factorCosts.guarantee,
              businessProfitPercentage: factorCosts.businessProfit,
              shippingPercentage: factorCosts.shipping,
              type_of_delivery: 0,
              type_of_payment: 0,
            })
              .then((res) => {
                setLoading(false);
                router.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}${paths.adminDashboard.order.root}`
                );
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
        }}
      >
        {order ? 'ویرایش سفارش' : 'ساخت سفارش'}
      </Button>

      <AddressNewEditForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        onCreate={({ full_name }) => usingCreatedAddress(full_name)}
        addressInfo={addressInfo}
      />
    </Stack>
  );
};
