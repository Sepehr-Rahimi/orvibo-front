import React from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';

import { Box, Button, Card, Stack, Typography } from '@mui/material';

import { updateCurrency, useGetCurrency } from 'src/actions/variables';

import { Field, Form } from 'src/components/hook-form';

const currencySchema = zod.object({
  newCurrency: zod.number().min(0, { message: 'لطفا مقدار صحیح وارد کنید' }),
});

export const CurrencyUpdateForm = () => {
  const { currency: currentCurrency, error, currencyLoading } = useGetCurrency();

  const defaultValues = {
    newCurrency: currentCurrency?.value,
  };

  const methods = useForm({
    zodResolver: currencySchema,
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors, isLoading },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    const res = await updateCurrency(data?.newCurrency);
    // console.log(res);
  });
  return (
    <Box>
      <Card sx={{ px: 2, py: 1, my: 2, width: 'fit-content' }}>
        <Typography>
          {' '}
          قیمت قبلی : {currentCurrency?.value} {currentCurrency?.description}{' '}
        </Typography>
      </Card>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack direction="row" gap={3}>
          <Field.Text
            sx={{ flex: 3 }}
            type="number"
            name="newCurrency"
            defaultValue={currentCurrency?.value}
          />
          <Button disabled={isSubmitting} sx={{ flex: 1 }} type="submit" variant="contained">
            تغییر
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};
