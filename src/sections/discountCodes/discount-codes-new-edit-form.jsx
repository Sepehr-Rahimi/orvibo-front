import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import {
  createDiscountCode,
  deleteDiscountCode,
  updateDiscountCode,
} from 'src/actions/discountCodes';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export const NewCategorySchema = zod.object({
  code: zod.string().min(1, { message: 'کد تخفیف الزامی است!' }),
  type: zod.enum(['fixed', 'percentage']),
  value: zod.number().min(1, { message: 'مقدار تخفیف الزامی است!' }),
  min_order: zod.string().min(1, { message: 'مقدار حداقل سفارش الزامی است!' }),
  max_uses: zod.number().min(1, { message: 'مقدار دفعات قابل استفاده الزامی است!' }),
  max_amount: zod.number().default(0),
  start_date: zod.any({ required_error: 'تاریخ شروع الزامی است!' }),
  end_date: zod.any({ required_error: 'تاریخ پایان الزامی است!' }),
  active: zod.boolean(),
  user_specific: zod.boolean(),
});

// ----------------------------------------------------------------------

export function DiscountCodesNewEditForm({ currentDiscount }) {
  const confirm = useBoolean(false);

  const params = useParams();

  const router = useRouter();

  const [typeValue, setTypeValue] = useState('');

  const defaultValues = useMemo(
    () => ({
      code: currentDiscount?.code || '',
      type: currentDiscount?.type || 'fixed',
      value: currentDiscount?.value ? +currentDiscount.value : '',
      min_order: currentDiscount?.min_order || '',
      max_uses: currentDiscount?.max_uses ? +currentDiscount.max_uses : '',
      max_amount: currentDiscount?.max_amount ? +currentDiscount.max_amount : 0,
      start_date: currentDiscount?.start_date || '',
      end_date: currentDiscount?.end_date || '',
      active: currentDiscount?.active || false,
      user_specific: currentDiscount?.user_specific || false,
    }),
    [currentDiscount]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewCategorySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    resetField,
  } = methods;

  const { type } = watch();
  useEffect(() => {
    if (type === 'fixed') {
      resetField('max_amount');
    }
  }, [type, resetField]);

  const handleDelete = async () => {
    await deleteDiscountCode(params?.id);

    toast.success('حذف با موفقیت انجام شد');
    confirm.onFalse();
    router.push(paths.adminDashboard.discountCodes.root);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentDiscount) {
        await updateDiscountCode({
          ...data,
          id: params?.id || '',
        });
      } else {
        await createDiscountCode({
          ...data,
        });
        reset();
      }
      toast.success(
        currentDiscount ? 'ویرایش با موفقیت انجام شد!' : 'ایجاد کد تخفیف با موفقیت انجام شد!'
      );
      // router.push(paths.adminDashboard.Categoriess.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {/* <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  آیکون
                </Typography>
                <Field.UploadAvatar
                  name="imageURL"
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
                      *.jpeg, *.jpg, *.png مجاز هستند
                      <br /> حداکثل سایز {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {/* <Field.Switch
                name="isActive"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      فعال
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      برای استفاده از این کد تخفیف ، این گزینه را فعال کنید
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              /> */}
          {/* </Card> */}
          {/* </Grid> */}

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
                <Field.Text name="code" label="کد تخفیف" />
                <Box />
                <Field.RadioGroup
                  row
                  options={[
                    {
                      value: 'fixed',
                      label: 'ثابت',
                    },
                    {
                      value: 'percentage',
                      label: 'درصد',
                    },
                  ]}
                  name="type"
                  label="نوع تخفبف"
                />
                <Field.Text type="number" name="value" label="مقدار تخفیف" />
                <Field.Text name="min_order" label="حداقل سفارش" />
                <Field.Text
                  type="number"
                  name="max_amount"
                  label="حداکثر سفارش"
                  disabled={watch().type === 'fixed'}
                />
                <Field.Text type="number" name="max_uses" label="دفعات قابل استفاده" />
                <Field.DatePicker persian label="تاریخ شروع" name="start_date" />
                <Field.DatePicker persian label="تاریخ پایان" name="end_date" />
                <Field.Switch
                  name="active"
                  labelPlacement="start"
                  label={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      فعال
                    </Typography>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
                <Field.Switch
                  name="user_specific"
                  labelPlacement="start"
                  label={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      فقط یکبار قابل استفاده باشد برای هر کاربر
                    </Typography>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentDiscount ? 'ایجاد کد تخفیف' : 'ذخیره تغییرات'}
                </LoadingButton>
                {currentDiscount && (
                  <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                    <Button variant="soft" color="error" onClick={confirm.onTrue}>
                      حذف کد تخفیف
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="حذف"
        content="آیا مطمئن هستید که می خواهید حذف کنید؟"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            حذف
          </Button>
        }
      />
    </>
  );
}
