'use client';

import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, Button, FormLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { resetPassword, sendVerificationCode } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function JwtForgetPasswordView() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const { value: isCodeSent, onTrue: setIsCodeSent, onFalse: setIsCodeNotSent } = useBoolean(false);

  const { seconds: countdown, start: startCountdown } = useCountdownSeconds();

  const SignInSchema = useCallback(
    () =>
      isCodeSent
        ? zod
            .object({
              password: zod
                .string()
                .min(1, { message: 'رمز ورود الزامی است!' })
                .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }),
              confirmPassword: zod
                .string()
                .min(1, { message: 'تکرار رمز ورود الزامی است!' })
                .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }),
              code: zod
                .string()
                .min(1, { message: 'کد احراز الزامی است!' })
                .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }),
              phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
            })
            .refine((data) => data.password === data.confirmPassword, {
              message: 'پسوردها یکسان نیستند!',
              path: ['confirmPassword'],
            })
        : zod.object({
            phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
          }),
    [isCodeSent]
  );

  const password = useBoolean();

  const defaultValues = {
    phone: '',
    password: '',
    confirmPassword: '',
    code: '',
  };
  // const defaultValues = {
  //   phone: 'demo@minimals.cc',
  //   password: '@demo1',
  // };

  const methods = useForm({
    resolver: zodResolver(SignInSchema()),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
  } = methods;

  const values = watch();

  const handleSendCodeAgain = async () => {
    await sendVerificationCode({ phone_or_email: values.phone });
    setIsCodeSent();
    startCountdown(300);
    toast.success('کد احراز ارسال شد');
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!isCodeSent) {
        await sendVerificationCode({ phone_or_email: data.phone });
        toast.success('کد احراز ارسال شد');
        setIsCodeSent();
        startCountdown(300);
      } else {
        await resetPassword({
          code: data.code,
          password: data.password,
          phone_or_email: data.phone,
        });
        toast.success('رمز ورود تغییر یافت');
        reset();
        setIsCodeNotSent();
        router.push(paths.auth.jwt.signIn);
      }
    } catch (error) {
      if (error?.remaining_time) {
        startCountdown(error?.remaining_time);
        setIsCodeSent();
      }
      console.error(error);
      // setErrorMsg(error instanceof Error ? error?.response?.data?.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 5 }}>
      <Typography variant="h5">فراموشی رمز عبور!</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          رمز عبور را به خاطر آوردید؟
        </Typography>
        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          وارد شود
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Phone
        country="IR"
        disableSelect
        name="phone"
        label="شماره موبایل"
        disabled={isCodeSent}
        InputLabelProps={{ shrink: true }}
      />
      {isCodeSent && (
        <>
          <Stack spacing={1}>
            <FormLabel>کد احراز</FormLabel>
            <Field.Code name="code" />
            <Button
              variant="contained"
              color="primary"
              disabled={countdown > 0}
              onClick={() => {
                handleSendCodeAgain();
              }}
            >
              ارسال دوباره کد {countdown ? `(ثانیه : ${countdown})` : ''}
            </Button>
          </Stack>

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

          <Field.Text
            name="confirmPassword"
            label="تکرار رمز ورود"
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
        </>
      )}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="درحال تایید ..."
      >
        تایید
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
