import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetBrands } from 'src/actions/brands';
import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';
import { useGetTreeCategories, useGetParentCategories } from 'src/actions/categories';
import { createProduct, updateProduct, deleteProductImages } from 'src/actions/product';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { StyledTreeList } from 'src/components/styled-tree-list/styledTreeList';
import MultiValueTextField from 'src/components/multiValueTextField/multiValueTextField';

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'نام محصول الزامی است!' }),
  description: schemaHelper.editor({ message: { required_error: 'توضیحات الزامی است!' } }),
  images: schemaHelper.files({ message: { required_error: 'عکس الزامی است!' } }),
  code: zod.string().min(1, { message: 'کد محصول الزامی است!' }),
  model: zod.string().min(1, { message: 'مدل محصول الزامی است!' }),
  stock: zod.number().min(0, { message: 'موجودی الزامی است!' }),
  slug: zod.string().min(1, { message: 'اسلاگ محصول الزامی است' }),
  category_id: zod.number().min(1, { message: 'دسته بندی الزامی است!' }),
  brand_id: zod.string().min(1, { message: 'برند الزامی است!' }),
  colors: zod.string().array().nonempty({ message: 'حداقل یک رنگ انتخاب شود' }),
  sizes: zod.string().array(),
  kinds: zod.string().array(),
  main_features: zod.string().array(),
  currency_price: zod.number().min(1, { message: 'قیمت الزامی است' }),
  discount_percentage: zod.number(),
  is_published: zod.boolean(),
  summary: zod.string(),
  label: zod.object({ enabled: zod.boolean(), content: zod.string() }),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const { Categories: parentCategories, CategoriesLoading: parentCategoriesLoading } =
    useGetParentCategories(currentProduct?.category_id);

  const { treeCategories } = useGetTreeCategories();

  const { brands } = useGetBrands();

  // console.log(currentProduct?.images);
  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      // price: +(currentProduct?.price || 0),
      currency_price: +(currentProduct?.currency_price || 0),
      discount_percentage: +(currentProduct?.discount_percentage || 0),
      summary: currentProduct?.summary || '',
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      stock: currentProduct?.stock || '',
      slug: currentProduct?.slug || '',
      main_features: currentProduct?.main_features || [],
      description: currentProduct?.description || '',
      kinds: currentProduct?.kinds || [],
      model: currentProduct?.model || '',
      category_id: currentProduct?.category_id || '',
      brand_id: currentProduct?.brand_id?.toString() || '',
      code: currentProduct?.code || '',
      images: currentProduct?.images || [],
      label: {
        content: currentProduct?.label || '',
        enabled: !!currentProduct?.label,
      },
      is_published: !!currentProduct?.is_published,
    }),
    [currentProduct]
  );

  // console.log(defaultValues.images);

  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('DATA', data);
      if (currentProduct?.id) {
        const orderImages = data.images.map((image) => (image instanceof File ? 'file' : 'url'));
        // console.log(orderImages);
        await updateProduct({
          ...data,
          id: currentProduct?.id,
          label: data?.label?.enabled ? data?.label?.content : '',
          orderImages,
        }).then(() => {
          router.push(paths.adminDashboard.product.root);
        });
      } else {
        await createProduct({ ...data, label: data.label.enabled ? data.label.content : '' }).then(
          () => {
            reset();
          }
        );
      }
      toast.success(currentProduct ? 'ویرایش با موفقیت انجام شد!' : 'محصول با موفقیت ایجاد شد!');
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    async (inputFile) => {
      // console.log(inputFile);
      // if (!inputFile?.size) {
      // console.log('One');
      // try {
      //   await deleteProductImages({ id: currentProduct?.id, images: [inputFile] });
      //   const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      //   setValue('images', filtered);
      // } catch (e) {
      //   console.log(e);
      // }
      // } else {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
      // }
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(async () => {
    // console.log('All');
    const serverFiles = values.images.filter((i) => !i?.size);

    if (serverFiles.length > 0) {
      try {
        await deleteProductImages({ id: currentProduct?.id, images: serverFiles });
      } catch (error) {
        console.log(error);
      }
    }
    setValue('images', [], { shouldValidate: true });
  }, [setValue, currentProduct?.id, values?.images]);

  const handleThumbnailActive = useCallback(
    (inputFile) => {
      const otherImages = values?.images && values.images.filter((file) => file !== inputFile);
      setValue('images', [inputFile, ...otherImages]);
      // console.log(values.images);
    },
    [setValue, values]
  );

  const renderDetails = (
    <Card>
      <CardHeader
        title="اطلاعات"
        subheader="نام محصول , توضیحات کوتاه , عکس ها..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="نام محصول" />

        <Field.Text name="slug" label="slug" />

        <Field.Text name="summary" label="توضیحات خلاصه " multiline rows={4} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">توضیحات کامل</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">عکس ها</Typography>
          <Field.Upload
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onActiveForThumbnail={handleThumbnailActive}
            // onUpload={() => console.info('ON UPLOAD')}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader title="مشخصات" subheader="مشخصات و ویژگی های اضافه..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="code" label="کد محصول" />

          <Field.Text name="model" label="مدل" />

          <Field.Text
            name="stock"
            label="موجودی"
            placeholder="0"
            type="number"
            InputLabelProps={{ shrink: true }}
          />

          {/* <Field.Select
            native
            name="category_id"
            label="دسته بندی"
            InputLabelProps={{ shrink: true }}
          >
            {/* {treeCategories.map((category) => (
              <optgroup key={category.id} label={category.name}>
                {category.children.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </optgroup>
            ))} */}
          {/* {buildCategoryTree(treeCategories)} */}
          {/* </Field.Select>  */}
          <Field.Select native name="brand_id" label="برند" InputLabelProps={{ shrink: true }}>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Field.Select>

          <Field.MultiSelect
            checkbox
            name="colors"
            label="رنگ ها"
            color
            options={PRODUCT_COLOR_NAME_OPTIONS}
          />

          <MultiValueTextField label="سایزها" name="sizes" />

          <MultiValueTextField label="انواع" name="kinds" />
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" spacing={3}>
          <Field.Switch name="label.enabled" label={null} sx={{ m: 0 }} />
          <Field.Text
            name="label.content"
            label="لیبل"
            fullWidth
            disabled={!values?.label?.enabled}
          />
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack spacing={2}>
          <CardHeader title="دسته بندی" />
          {((currentProduct?.category_id && !parentCategoriesLoading) ||
            !currentProduct?.category_id) && (
            <StyledTreeList
              defaultExpandedItems={parentCategories.map((c) => c.id)}
              selectedItems={[values.category_id]}
              onSelectedItemsChange={(_, id) => {
                setValue('category_id', id);
              }}
              items={treeCategories}
            />
          )}
          {errors.category_id && (
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: `error.main`, textTransform: 'capitalize' }}
            >
              {errors.category_id.message}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );

  const renderPricing = (
    <Card>
      <CardHeader title="قیمت ها" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="currency_price"
          label=" قیمت محصول به دلار"
          placeholder="00"
          type="number"
          InputLabelProps={{ shrink: true }}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <Box component="span" sx={{ color: 'text.disabled' }}>
          //         $
          //       </Box>
          //     </InputAdornment>
          //   ),
          // }}
        />

        <Field.Text
          name="discount_percentage"
          label="درصد تخفیف"
          placeholder="0"
          type="number"
          InputLabelProps={{ shrink: true }}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">
          //       <Box component="span" sx={{ color: 'text.disabled' }}>
          //         $
          //       </Box>
          //     </InputAdornment>
          //   ),
          // }}
        />

        {/* <FormControlLabel
          control={
            <Switch id="toggle-taxes" checked={includeTaxes} onChange={handleChangeIncludeTaxes} />
          }
          label="Price includes taxes"
        />

        {!includeTaxes && (
          <Field.Text
            name="taxes"
            label="Tax (%)"
            placeholder="0.00"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    %
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        )} */}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={
          <Switch
            checked={values.is_published}
            onChange={(e) => setValue('is_published', e.target.checked)}
            inputProps={{
              id: 'is_published',
              name: 'is_published',
            }}
          />
        }
        label="نشان دادن در سایت"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? 'ایجاد محصول' : 'ذخیره تغییرات'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderProperties}

        {renderPricing}

        {renderActions}
      </Stack>
    </Form>
  );
}
