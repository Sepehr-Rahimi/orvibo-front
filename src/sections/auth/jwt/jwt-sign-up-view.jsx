'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import Link from '@mui/material/Link';
import { Button } from '@mui/material';
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
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { AccountConfirmDialogContent } from 'src/sections/account/account-confirm-dialog-content';

import { useAuthContext } from 'src/auth/hooks';
import { signUp, validateUserInfo } from 'src/auth/context/jwt';
import { trackMatomoEvent } from 'src/utils/helper';

// ----------------------------------------------------------------------

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'نام الزامی است!' }),
  lastName: zod.string().min(1, { message: 'نام حانوادگی الزامی است!' }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  password: zod
    .string()
    .min(1, { message: 'رمز ورود الزامی است!' })
    .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }),
});

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const { checkUserSession } = useAuthContext();

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const [code, setCode] = useState();
  const openDialog = useBoolean();

  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        phone: data.phone,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        code,
      });
      await checkUserSession?.();

      trackMatomoEvent('signup-success', { userFullName: `${data.firstName} ${data.lastName}` });

      router.refresh();
    } catch (error) {
      console.error(error.message);
      // console.log(error);
      // setErrorMsg(error instanceof Error ? error.response.data.message : error);
    }
  });

  const verifyInfo = async () => {
    setErrorMsg('');
    const isValid = await methods.trigger(); // runs Zod schema validation
    if (!isValid) return; // stop if form is invalid
    try {
      const res = await validateUserInfo(watch().phone);
      if (res) openDialog.onTrue();
    } catch (error) {
      // console.log(error);
      setErrorMsg(error instanceof Error ? error.response.data.message : error.message);
    }
  };

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">حساب کاربری خود را ایجاد کنید</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          از قبل حساب کاربری دارید؟
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          ورود
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Field.Text name="firstName" label="نام" InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label="نام خانوادگی" InputLabelProps={{ shrink: true }} />
      </Stack>

      <Field.Phone
        disableSelect
        country="IR"
        name="phone"
        label="شماره موبایل"
        InputLabelProps={{ shrink: true }}
      />

      <Field.Text
        name="password"
        label="رمز ورود"
        placeholder="**********"
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
      <Button type="button" variant="outlined" onClick={verifyInfo}>
        تایید شماره موبایل
      </Button>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      با ثبت نام، موافق{' '}
      <Link underline="always" color="text.primary" href={paths.terms}>
        شرایط خدمات
      </Link>
      {' و '}
      <Link underline="always" color="text.primary" href={paths.privacy}>
        سیاست حفظ حریم خصوصی{' '}
      </Link>
      هستم .
    </Typography>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit} id="confirm-form" i>
        {renderForm}

        <ConfirmDialog
          title="تایید شماره موبایل"
          content={
            <AccountConfirmDialogContent phone={watch()?.phone} code={code} setCode={setCode} />
          }
          open={openDialog.value}
          onClose={openDialog.onFalse}
          action={
            <Button
              type="submit"
              variant="contained"
              load
              form="confirm-form"
              {...(isSubmitting && { loading: true })}
            >
              تایید
            </Button>
          }
        />
      </Form>

      {renderTerms}
    </>
  );
}
