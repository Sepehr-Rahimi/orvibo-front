'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';
import { signInWithPassword } from 'src/auth/context/jwt';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  password: zod
    .string()
    .min(1, { message: 'رمز ورود الزامی است!' })
    .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    phone: '',
    password: '',
  };
  // const defaultValues = {
  //   phone: 'demo@minimals.cc',
  //   password: '@demo1',
  // };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ phone: data.phone, password: data.password });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      // setErrorMsg(error instanceof Error ? error?.response?.data?.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">وارد حساب کاربری خود شوید</Typography>
      <Link component={RouterLink} href={paths.auth.jwt.signUp}>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            حساب کاربری ندارید؟
          </Typography>

          <Box variant="subtitle2">ثبت نام کنید</Box>
        </Stack>
      </Link>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Phone
        country="IR"
        disableSelect
        name="phone"
        label="شماره موبایل"
        InputLabelProps={{ shrink: true }}
      />

      <Stack spacing={1.5}>
        <Link
          component={RouterLink}
          href={paths.auth.jwt.forgetPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          رمز عبور را فراموش کرده اید؟
        </Link>

        <Field.Text
          name="password"
          label="رمز ورود"
          placeholder="*********"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="در حال ورود ..."
      >
        ورود
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        از <strong>{defaultValues.phone}</strong>
        {' با رمز'}
        <strong>{defaultValues.password}</strong>
        {' استفاده کنید'}
      </Alert> */}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
