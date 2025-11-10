import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
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

import { fData } from 'src/utils/format-number';

import { createCategory, updateCategory, deleteCategories } from 'src/actions/categories';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export const NewCategorySchema = zod.object({
  imageURL: zod.any(),
  name: zod.string().min(1, { message: 'نام دسته بندی الزامی است!' }),
  description: zod.string(),
});

// ----------------------------------------------------------------------

export function CategoryNewEditForm({ currentCategory }) {
  const confirm = useBoolean(false);

  const params = useParams();

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || '',
      imageURL: currentCategory?.image_url || null,
      description: currentCategory?.description || '',
    }),
    [currentCategory]
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
  } = methods;

  const handleDelete = async () => {
    await deleteCategories(params?.id);

    toast.success('حذف با موفقیت انجام شد');
    confirm.onFalse();
    router.push(paths.adminDashboard.categories.root);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentCategory) {
        await updateCategory({
          description: data.description,
          image_url: data?.imageURL,
          name: data.name,
          id: params?.id || '',
        });
      } else {
        await createCategory({
          description: data.description || '',
          image_url: data.imageURL,
          name: data.name,
          parent_id: params?.parent_id?.length > 0 ? params?.parent_id[0] : undefined,
        });
        reset();
      }
      toast.success(
        currentCategory ? 'ویرایش با موفقیت انجام شد!' : 'ایجاد دسته بندی با موفقیت انجام شد!'
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
          <Grid xs={12} md={4}>
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
                      برای استفاده از این دسته بندی ، این گزینه را فعال کنید
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              /> */}
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
                <Field.Text name="name" label="نام دسته بندی" />
                <Field.Text name="description" label="توضیحات" />
                {/* <Field.Text
                  name="imageURL"
                  label="نام آیکون "
                  helperText="(https://icon-sets.iconify.design)"
                /> */}
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!currentCategory ? 'ایجاد دسته بندی' : 'ذخیره تغییرات'}
                </LoadingButton>
                {currentCategory && (
                  <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                    <Button variant="soft" color="error" onClick={confirm.onTrue}>
                      حذف دسته بندی
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
