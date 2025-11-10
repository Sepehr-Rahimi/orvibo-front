import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { changePassword } from 'src/auth/context/jwt';

export const ChangePassWordSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: 'رمز ورود قبلی الزامی است!' })
      .min(6, { message: 'رمز ورود باید حداقل 6 کاراکتر باشد!' }),
    newPassword: zod.string().min(1, { message: 'رمز ورود جدید الزامی است!' }),
    confirmNewPassword: zod.string().min(1, { message: 'تکرار رمز ورود جدید الزامی است!' }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'رمز ورود جدید باید با رمز ورود قبلی متفاوت باشد',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'رمز ورود ها یکسان نیستند!',
    path: ['confirmNewPassword'],
  });

// ----------------------------------------------------------------------

export function AccountChangePassword() {
  const oldPassword = useBoolean();
  const newPassword = useBoolean();
  const confirmNewPassword = useBoolean();

  const defaultValues = { oldPassword: '', newPassword: '', confirmNewPassword: '' };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await changePassword({ currentPassword: data.oldPassword, newPassword: data.newPassword });

      reset();
      toast.success('رمز عبور با موفقیت ویرایش شد!');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
        <Field.Text
          name="oldPassword"
          type={oldPassword.value ? 'text' : 'password'}
          label="رمز ورود قبلی"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={oldPassword.onToggle} edge="end">
                  <Iconify icon={oldPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="newPassword"
          label="رمز ورود جدید"
          type={newPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={newPassword.onToggle} edge="end">
                  <Iconify icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> رمز ورود باید حداقل 6
              کاراکتر باشد
            </Stack>
          }
        />

        <Field.Text
          name="confirmNewPassword"
          type={confirmNewPassword.value ? 'text' : 'password'}
          label="نکرار رمز ورود جدید"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={confirmNewPassword.onToggle} edge="end">
                  <Iconify
                    icon={confirmNewPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          ذخیره تغییرات
        </LoadingButton>
      </Card>
    </Form>
  );
}
