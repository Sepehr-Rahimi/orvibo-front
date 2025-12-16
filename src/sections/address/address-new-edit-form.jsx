import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { createAddress, updateAddress } from 'src/actions/addresses';

import { Form, Field } from 'src/components/hook-form';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export const NewAddressSchema = zod.object({
  is_home: zod.boolean(),
  full_name: zod.string().min(1, { message: 'نام الزامی است!' }),
  latin_full_name: zod
    .string()
    .regex(/^[A-Za-z ]+$/, 'فقط حروف لاتین مجاز است')
    .min(1, 'نام لاتین الزامی است'),
  phone_number: zod.string().min(1, { message: 'شماره موبایل الزامی است!' }),
  address: zod.string().min(1, { message: 'آدرس الزامی است!' }),
  city: zod.string().min(1, { message: 'شهر الزامی است!' }),
  province: zod.string().min(1, { message: 'استان الزامی است!' }),
  zipcode: zod.string().min(1, { message: 'کد پستی الزامی است!' }),
  is_default: zod.boolean(),
});

export function AddressNewEditForm({ open, onClose, onCreate, addressesMutate, addressInfo }) {
  // console.log(addressInfo);
  const defaultValues = {
    is_home: true,
    full_name: '',
    latin_full_name: '',
    phone_number: '',
    address: '',
    city: '',
    province: '',
    zipcode: '',
    is_default: false,
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;

  const values = watch();

  // console.log(watch());

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (addressInfo?.id) {
        await updateAddress({ ...data, id: addressInfo.id });
      } else {
        await createAddress({
          ...data,
        });
      }
      onCreate?.({
        full_name: data.full_name,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.zipCode}, ${data.state}, ${data.city}, ${data.address}`,
        addressType: data.addressType,
        primary: data.primary,
      });
      addressesMutate?.();
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (addressInfo?.id) {
      reset(addressInfo);
    } else reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressInfo, reset]);

  // const handleValidation = (e) => {
  //   const lastIndext = e.target.value.split('')[e.target.value.length - 1];
  //   const reg = /[a-z]/;
  //   const isValid = reg.test(lastIndext);
  //   if (isValid) setValue('latin_full_name', e.target.value);
  // };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>آدرس جدید</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <Field.RadioGroup
              row
              name="is_home"
              options={[
                { label: 'خانه', value: 1 },
                { label: 'محل کار', value: 2 },
              ]}
              onChange={(p, t) =>
                t === '1' ? setValue('is_home', true) : setValue('is_home', false)
              }
              value={values.is_home ? '1' : '2'}
            />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="full_name" label="نام و نام خانوادگی" />

              <Field.Phone name="phone_number" disableSelect country="IR" label="شماره موبایل" />
            </Box>
            <Field.Text
              label="نام و نام خانوادگی با حروف لاتین"
              // eslint-disable-next-line arrow-body-style
              // onChange={(e) => handleValidation(e)}
              name="latin_full_name"
            />

            <Field.Text name="address" label="آدرس" />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <Field.Text name="city" label="شهر" />

              <Field.Text name="province" label="استان" />

              <Field.Text name="zipcode" label="کدپستی" />
            </Box>

            {/* <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" /> */}

            <Field.Checkbox name="is_default" label="از این آدرس به عنوان پیش فرض استفاده کنید." />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            لغو
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {addressInfo?.id ? 'ویرایش' : 'ذخیره'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
