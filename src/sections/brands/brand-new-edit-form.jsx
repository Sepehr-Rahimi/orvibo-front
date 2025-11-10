import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';

import { createBrand, deleteBrand, updateBrand } from 'src/actions/brands';

import { toast } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewBrandSchema = zod.object({
  logoURL: schemaHelper.file({
    message: { required_error: 'آپلود لوگو الزامی است' },
  }),
  name: zod.string().min(1, { message: 'نام برند الزامی است!' }),
  englishName: zod.string().min(1, { message: 'نام لاتین برند الزامی است!' }),
  description: zod.string().min(1, { message: 'توضیحات الزامی است!' }),
  websiteURL: zod.string().min(1, { message: 'آدرس سایت الزامی است!' }),
  isActive: zod.boolean(),
});

// ----------------------------------------------------------------------

export function BrandNewEditForm({ currentBrand }) {
  const confirm = useBoolean(false);

  const params = useParams();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentBrand?.name || '',
      logoURL: currentBrand?.logo_url || null,
      isActive: currentBrand?.is_active,
      englishName: currentBrand?.english_name || '',
      description: currentBrand?.description || '',
      websiteURL: currentBrand?.website_url || '',
    }),
    [currentBrand]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewBrandSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleDelete = async () => {
    await deleteBrand(params?.id);

    toast.success('حذف با موفقیت انجام شد');
    confirm.onFalse();
    router.push(paths.adminDashboard.brands.root);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentBrand) {
        await updateBrand({
          description: data.description,
          english_name: data.englishName,
          is_active: data.isActive,
          logo_url: data?.logoURL,
          name: data.name,
          website_url: data.websiteURL,
          id: params?.id || '',
        });
      } else {
        await createBrand({
          description: data.description,
          english_name: data.englishName,
          is_active: data.isActive,
          logo_url: data.logoURL,
          name: data.name,
          website_url: data.websiteURL,
        });
        reset();
      }
      toast.success(currentBrand ? 'ویرایش با موفقیت انجام شد!' : 'ایجاد برند با موفقیت انجام شد!');
      // router.push(paths.adminDashboard.brands.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  لوگو
                </Typography>
                <Field.UploadAvatar
                  name="logoURL"
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

              <Field.Switch
                name="isActive"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      فعال
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      برای استفاده از این برند ، این گزینه را فعال کنید
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />

              {currentBrand && (
                <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                  <Button variant="soft" color="error" onClick={confirm.onTrue}>
                    حذف برند
                  </Button>
                </Stack>
              )}
            </Card>
          </Grid>

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
                <Field.Text name="name" label="نام برند" />
                <Field.Text name="englishName" label="نام لاتین برند" />
                <Field.Text name="description" label="توضیحات" />
                <Field.Text name="websiteURL" label="ادرس سایت" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentBrand ? 'ایجاد برند' : 'ذخیره تغییرات'}
                </LoadingButton>
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
