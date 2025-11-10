'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { useAuthContext } from 'src/auth/hooks';
import { verifyUser, updateProfile } from 'src/auth/context/jwt';

import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export const UpdateUserSchema = zod.object({
  firstName: zod.string().min(1, { message: 'نام الزامی است!' }),
  lastName: zod.string().min(1, { message: 'نام خانوادگی الزامی است!' }),
  email: zod
    .string()
    .min(1, { message: 'ایمیل الزامی است!' })
    .email({ message: 'ایمیل باید یک آدرس ایمیل معتبر باشد!' }),
  // photoURL: schemaHelper.file({
  //   message: { required_error: 'Avatar is required!' },
  // }),
  // phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  // country: schemaHelper.objectOrNull({
  //   message: { required_error: 'Country is required!' },
  // }),
  // address: zod.string().min(1, { message: 'Address is required!' }),
  // state: zod.string().min(1, { message: 'State is required!' }),
  // city: zod.string().min(1, { message: 'City is required!' }),
  // zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  // about: zod.string().min(1, { message: 'About is required!' }),
  // // Not required
  // isPublic: zod.boolean(),
});

export function AccountGeneral() {
  const { user, checkUserSession } = useAuthContext();
  const openDialog = useBoolean();

  const [code, setCode] = useState('');

  const { refresh } = useRouter();

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phone_number || '',
    // photoURL: ''
    // country: ''
    // address: ''
    // state: ''
    // city: ''
    // zipCode: ''
    // about: ''
    // isPublic: ''
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProfile({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await checkUserSession?.();

      toast.success('تغییرات با موفقیت ذخیره شد!');
    } catch (error) {
      console.error(error);
    }
  });

  const handleVerifyUser = async () => {
    const res = await verifyUser({ phone_or_email: user?.phone_number, code });
    if (res?.data) {
      toast.success('با موفقیت تایید شد');
      openDialog.onFalse();
      await checkUserSession?.();
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Field.UploadAvatar
              name="photoURL"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            />

            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete user
            </Button>
          </Card>
        </Grid> */}

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="firstName" label="نام" />
              <Field.Text name="lastName" label="نام خانوادگی" />
              <Field.Text name="email" label="ایمیل" />
              <Field.Phone
                name="phoneNumber"
                label="شماره موبایل"
                disableSelect
                country="IR"
                disabled
              />
              {/* <Field.Text name="address" label="Address" /> */}

              {/* <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" /> */}

              {/* <Field.Text name="state" label="State/region" /> */}
              {/* <Field.Text name="city" label="City" /> */}
              {/* <Field.Text name="zipCode" label="Zip/code" /> */}
            </Box>

            <Stack
              spacing={3}
              alignItems="flex-end"
              justifyContent="end"
              direction={user?.status === 0 ? 'row' : 'column'}
              sx={{ mt: 3 }}
            >
              {/* <Field.Text name="about" multiline rows={4} label="About" /> */}
              {/* {user?.status === 0 ? (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    openDialog.onTrue();
                  }}
                >
                  تایید شماره موبایل
                </Button>
              ) : (
                <Label variant="soft" color="success">
                  شماره شما تایید شده
                </Label>
              )} */}

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                ذخیره تغییرات
              </LoadingButton>
              {/* <ConfirmDialog
                title="تایید شماره موبایل"
                content={
                  <AccountConfirmDialogContent
                    phone={user?.phone_number}
                    code={code}
                    setCode={setCode}
                  />
                }
                open={openDialog.value}
                onClose={openDialog.onFalse}
                action={
                  <Button type="submit" variant="contained" onClick={() => handleVerifyUser()}>
                    تایید
                  </Button>
                }
              /> */}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
