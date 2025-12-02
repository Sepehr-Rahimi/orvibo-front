import { z as zod } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { Button, MenuItem } from '@mui/material';
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
  // code: zod.string().min(1, { message: 'کد محصول الزامی است!' }),
  model: zod.string(),
  // stock: zod.number().min(0, { message: 'موجودی الزامی است!' }),
  slug: zod.string().min(1, { message: 'اسلاگ محصول الزامی است' }),
  category_id: zod.number().min(1, { message: 'دسته بندی الزامی است!' }),
  brand_id: zod.string().min(1, { message: 'برند الزامی است!' }),
  // colors: zod.string().array().nonempty({ message: 'حداقل یک رنگ انتخاب شود' }),
  // sizes: zod.string().array(),
  // kinds: zod.string().array(),
  main_features: zod.string().array(),
  // currency_price: zod.number().min(1, { message: 'قیمت الزامی است' }),
  // discount_percentage: zod.number(),
  is_published: zod.boolean(),
  summary: zod.string(),
  label: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  weight: zod.number(),
  variants: zod
    .array(
      zod.object({
        color: zod.string().min(1, 'رنگ نباید خالی باشد'),
        sku: zod.string().min(1, 'مدل الزامی است'),
        // size: zod.string(),
        stock: zod
          .number()
          // .int('موجودی باید یک عدد صحیح باشد')
          .min(0, 'موجودی نمی‌تواند منفی باشد'),
        currency_price: zod
          .union([zod.string(), zod.number()])
          .refine((val) => !Number.isNaN(Number(val)), {
            message: 'Must be a number or numeric string',
          }),
        discount_percentage: zod.number().optional(),
        kind: zod.nullable(zod.string()).optional(),
        is_published: zod.boolean().optional(),
      })
    )
    .min(1, 'حداقل یک ورژن محصول لازم است'),
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
      // kinds: currentProduct?.kinds || [],
      model: currentProduct?.model || '',
      category_id: currentProduct?.category_id || '',
      brand_id: currentProduct?.brand_id?.toString() || '',
      // code: currentProduct?.code || '',
      images: currentProduct?.images || [],
      label: {
        content: currentProduct?.label || '',
        enabled: !!currentProduct?.label,
      },
      weight: +(currentProduct?.weight || 0),
      variants:
        currentProduct?.variants ||
        [
          /* 
        {        
        color:#hex
        size:string
        stock:number
        currencyPrice:number
        discount_price:number(percentage)
        isPublished:boolean
        }
        */
        ],
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
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

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
          {/* <Field.Text name="code" label="کد محصول" /> */}

          <Field.Text name="model" label="مدل" />

          {/* <Field.Text
            name="stock"
            label="موجودی"
            placeholder="0"
            type="number"
            InputLabelProps={{ shrink: true }}
          /> */}

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

          <Field.Text
            label="وزن"
            name="weight"
            sx={{ width: 1 }}
            // placeHolder="0"
            type="number"
            // InputLabelProps={{ shrink: true }}
          />

          {/* <Field.MultiSelect
            checkbox
            name="colors"
            label="رنگ ها"
            color
            options={PRODUCT_COLOR_NAME_OPTIONS}
          /> */}

          {/* <MultiValueTextField label="سایزها" name="sizes" /> */}

          {/* <MultiValueTextField label="انواع" name="kinds" /> */}
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
      {/* 
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
        /> */}

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
      {/* </Stack> */}
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={
          <Switch
            checked={!!values.is_published}
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

  const renderVariantCreation = (
    <Card>
      <CardHeader title="انواع" sx={{ mb: 2 }} />

      {fields.map((variant, index) => (
        <Stack gap={2} direction="column" py={3} px={2} key={variant.id}>
          <Stack gap={2} direction={{ md: 'row', xs: 'column' }} width={1}>
            <Field.Select
              name={`variants.${index}.color`}
              label="رنگ"
              // options={PRODUCT_COLOR_NAME_OPTIONS}
              sx={{ width: 1 }}
            >
              {PRODUCT_COLOR_NAME_OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  value={option.value}
                  // onClick={() => handleSelectService(index, service.name)}
                >
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Box> {option.label}</Box>
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        borderRadius: '100%',
                        backgroundColor: option.value,
                      }}
                    />
                  </Stack>
                </MenuItem>
              ))}
            </Field.Select>
            {/* <MultiValueTextField
              label="وزن"
              name={`variants.${index}.weight`}
              sx={{ width: 1 }}
              placeHolder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            /> */}
            <Field.Text label="نوع" name={`variants.${index}.kind`} />
          </Stack>
          <Stack gap={2} direction={{ md: 'row', xs: 'column' }}>
            <Field.Text
              name={`variants.${index}.currency_price`}
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
              name={`variants.${index}.discount_percentage`}
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
          </Stack>

          <Stack direction={{ md: 'row', xs: 'column' }} gap={2}>
            <Field.Text
              name={`variants.${index}.stock`}
              label="موجودی"
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <Field.Text name={`variants.${index}.sku`} label="مدل" type="string" />
          </Stack>
          <Stack direction={{ md: 'row', xs: 'column' }} gap={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={watch(`variants.${index}.is_published`)}
                  onChange={(e) => setValue(`variants.${index}.is_published`, e.target.checked)}
                  inputProps={{
                    id: `variants.${index}.is_published`,
                    name: `variants.${index}.is_published`,
                  }}
                />
              }
              label="نشان دادن در سایت"
              sx={{ pl: 3, flexGrow: 1 }}
            />
            <Button variant="outlined" onClick={() => remove(index)}>
              حذف
            </Button>
          </Stack>
        </Stack>
      ))}
      <Box sx={{ px: 2, my: 2 }}>
        <Button
          variant="contained"
          sx={{ width: 1 }}
          onClick={() =>
            append({
              color: '',
              size: '',
              kind: '',
              sku: '',
              stock: 0,
              currency_price: 0,
              discount_percentage: 0,
              is_published: false,
            })
          }
        >
          افزودن ورژن
        </Button>
      </Box>
    </Card>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderProperties}

        {/* {renderPricing} */}

        {renderVariantCreation}

        {renderActions}
      </Stack>
    </Form>
  );
}
