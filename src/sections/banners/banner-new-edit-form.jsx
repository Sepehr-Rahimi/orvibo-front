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

import { createBanner, deleteBanner, updateBanner } from 'src/actions/banners';

import { toast } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewBannerSchema = zod.object({
  cover: schemaHelper.file({
    message: { required_error: 'آپلود کاور الزامی است' },
  }),
  title: zod.string().min(1, { message: 'عنوان بنر الزامی است!' }),
  button_text: zod.string().min(1, { message: 'متن دکمه الزامی است!' }),
  description: zod.string().min(1, { message: 'توضیحات الزامی است!' }),
  link: zod.string().min(1, { message: 'لینک الزامی است!' }),
  is_published: zod.boolean(),
});

// ----------------------------------------------------------------------

export function BannerNewEditForm({ currentBanner }) {
  const confirm = useBoolean(false);

  const params = useParams();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      title: currentBanner?.title || '',
      cover: currentBanner?.cover || null,
      is_published: currentBanner?.is_published,
      button_text: currentBanner?.button_text || '',
      description: currentBanner?.description || '',
      link: currentBanner?.link || '',
    }),
    [currentBanner]
  );

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewBannerSchema),
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
    await deleteBanner(params?.id);

    toast.success('حذف با موفقیت انجام شد');
    confirm.onFalse();
    router.push(paths.adminDashboard.banners.root);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentBanner) {
        await updateBanner({
          id: params?.id || '',
          ...data,
        });
        // console.log(data);
      } else {
        await createBanner({
          ...data,
        });
        reset();
      }
      toast.success(currentBanner ? 'ویرایش با موفقیت انجام شد!' : 'ایجاد بنر با موفقیت انجام شد!');
      // router.push(paths.adminDashboard.banners.list);
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
                  کاور
                </Typography>
                <Field.UploadAvatar
                  name="cover"
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
              {/* <Box sx={{ mb: 5 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  کاور بک آپ
                </Typography>
                <Field.UploadAvatar
                  name="backupCover"
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
              </Box> */}

              <Field.Switch
                name="is_published"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      نمایش در سایت
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      برای نمایش این بنر ، این گزینه را فعال کنید
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />

              {currentBanner && (
                <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                  <Button variant="soft" color="error" onClick={confirm.onTrue}>
                    حذف بنر
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
                <Field.Text name="title" label="عنوان بنر" />
                <Field.Text name="button_text" label="متن دکمه" />
                <Field.Text name="description" label="توضیحات" />
                <Field.Text name="link" label="لینک" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentBanner ? 'ایجاد بنر' : 'ذخیره تغییرات'}
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
