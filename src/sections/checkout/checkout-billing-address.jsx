import { toast } from 'sonner';
import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { trackMatomoEvent } from 'src/utils/helper';

import { SignInButton } from 'src/layouts/components/sign-in-button';
import { deleteAddress, useGetAddresses } from 'src/actions/addresses';

import { Iconify } from 'src/components/iconify';

import { useAuthContext } from 'src/auth/hooks';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { AddressItem, AddressNewEditForm } from '../address';

// ----------------------------------------------------------------------

export function CheckoutBillingAddress() {
  useEffect(() => trackMatomoEvent('checkout-step', { checkoutStep: 'choosing address' }), []);

  const checkout = useCheckoutContext();

  const addressForm = useBoolean();

  const { user } = useAuthContext();

  const { addresses, addressesMutate } = useGetAddresses();

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      addressesMutate();
      toast.success('با موفقیت حذف شد');
    } catch (error) {
      console.log(error);
    }
  };

  const [addressInfo, setAddressInfo] = useState({});

  // useEffect(() => addressForm.onToggle(), [addressInfo]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          {user ? (
            addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressItem
                  key={address.id}
                  address={address}
                  action={
                    <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                      {!address.primary && (
                        <Button
                          onClick={() => handleDeleteAddress(address.id)}
                          size="small"
                          color="error"
                        >
                          حذف
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          // console.log('setshod');
                          setAddressInfo(address);
                          addressForm.onTrue();
                        }}
                        size="small"
                        color="secondary"
                        variant="text"
                        sx={{ mx: 1 }}
                      >
                        ویرایش
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => checkout.onCreateBilling(address)}
                      >
                        تحویل به این آدرس
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
              ))
            ) : (
              <Paper
                variant="elevation"
                elevation="5"
                sx={(t) => ({
                  padding: 2,
                  my: 3,
                  typography: t.typography.subtitle2,
                  color: t.palette.error.main,
                })}
              >
                آدرسی در حساب کاربری وجود ندارد! لطفا حداقل یک آدرس ایجاد کنید.
              </Paper>
            )
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={4}>
              <Typography variant="h6" color="error">
                لطفا ابتدا وارد حساب کاربری خود شوید!
              </Typography>
              <SignInButton />
            </Stack>
          )}

          <Typography variant="caption" color={(t) => t.palette.warning.dark}>
            لطفا یکی از آدرس ها را برای ادامه انتخاب کنید.( آدرس انتخابی شامل اطلاعات خریدار یا
            تحویل گیرنده هست )
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={checkout.onBackStep}
              endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              برگشت
            </Button>

            {user && (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setAddressInfo({});
                  addressForm.onTrue();
                }}
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                آدرس جدید
              </Button>
            )}
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutSummary
            total={checkout.total}
            subtotal={checkout.subtotal}
            discount={checkout.discount}
          />
        </Grid>
      </Grid>

      <AddressNewEditForm
        addressInfo={addressInfo}
        open={addressForm.value}
        onClose={addressForm.onFalse}
        addressesMutate={addressesMutate}
        // onCreate={checkout.onCreateBilling}
      />
    </>
  );
}
