import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { createBlog, updateBlog } from 'src/actions/blog';

import { Form, Field, schemaHelper } from 'src/components/hook-form';
import MultiValueTextField from 'src/components/multiValueTextField/multiValueTextField';

import { PostDetailsPreview } from './post-details-preview';

// ----------------------------------------------------------------------

export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'عنوان الزامی است!' }),
  summary: zod.string().min(1, { message: 'خلاصه الزامی است!' }),
  content: schemaHelper
    .editor({ message: { required_error: 'محتوا الزامی است!' } })
    .min(100, { message: 'حداقل 100 کاراکتر وارد کنید!' }),
  cover: schemaHelper.file({ message: { required_error: 'عکس الزامی است!' } }),
  tags: zod.string().array().min(2, { message: 'حداقل 2 تگ الزامی است!' }),
  meta_keywords: zod.string().array().nonempty({ message: 'کلمات کلیدی متا الزامی است!' }),
  // Not required
  meta_title: zod.string(),
  meta_description: zod.string(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const router = useRouter();

  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      summary: currentPost?.summary || '',
      content: currentPost?.content || '',
      cover: currentPost?.cover || null,
      tags: currentPost?.tags || [],
      meta_keywords: currentPost?.meta_keywords || [],
      meta_title: currentPost?.meta_title || '',
      meta_description: currentPost?.meta_description || '',
      is_published: currentPost?.is_published,
    }),
    [currentPost]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  const onSubmit = handleSubmit(async () => {
    try {
      if (currentPost?.id) {
        await updateBlog({
          ...values,
          id: currentPost.id,
          cover: values.cover?.size ? values.cover : undefined,
        }).then(() => {
          preview.onFalse();
          toast.success(currentPost ? 'با موفقیت ویرایش شد!' : 'بلاگ با موفقیت ایجاد شد!');
          router.push(paths.adminDashboard.post.root);
        });
        //
      } else {
        await createBlog(values).then(() => {
          reset();
          preview.onFalse();
          toast.success(currentPost ? 'با موفقیت ویرایش شد!' : 'بلاگ با موفقیت ایجاد شد!');
          router.push(paths.adminDashboard.post.root);
        });
      }

      console.info('DATA', values);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('cover', null);
  }, [setValue]);

  const renderDetails = (
    <Card>
      <CardHeader title="محتوا بلاگ" subheader="عنوان, خلاصه, عکس و..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="عنوان" />

        <Field.Text name="summary" label="خلاصه" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">محتوا</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">عکس بلاگ</Typography>
          <Field.Upload name="cover" maxSize={3145728} onDelete={handleRemoveFile} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="مشخصات"
        // subheader="مشخصات"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* <Field.Autocomplete
          name="tags"
          label="تگ ها"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        /> */}
        <MultiValueTextField label="تگ ها" name="tags" />

        <Field.Text name="meta_title" label="عنوان متا" />

        <Field.Text name="meta_description" label="توضیحات متا" fullWidth multiline rows={3} />

        <MultiValueTextField label="کلمات کلیدی متا" name="meta_keywords" />
        {/* <Field.Autocomplete
          name="meta_keywords"
          label="Meta keywords"
          placeholder="+ Keywords"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        /> */}

        {/* <FormControlLabel
          control={<Switch defaultChecked inputProps={{ id: 'comments-switch' }} />}
          label="Enable comments"
        /> */}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <FormControlLabel
        control={
          <Switch
            name="is_published"
            inputProps={{
              id: 'publish_switch',
            }}
            checked={values.is_published}
            onChange={(_, v) => {
              setValue('is_published', v);
            }}
          />
        }
        label="انتشار"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <div>
        <Button color="inherit" variant="outlined" size="large" onClick={preview.onTrue}>
          پیش نمایش
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'ایجاد بلاگ' : 'ذخیره تغییرات'}
        </LoadingButton>
      </div>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Stack>

      <PostDetailsPreview
        isValid={isValid}
        onSubmit={onSubmit}
        title={values.title}
        open={preview.value}
        content={values.content}
        onClose={preview.onFalse}
        coverUrl={values.cover}
        isSubmitting={isSubmitting}
        summary={values.summary}
        isNew={!currentPost}
      />
    </Form>
  );
}
