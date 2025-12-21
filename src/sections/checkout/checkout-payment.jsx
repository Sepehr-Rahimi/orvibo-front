import { z as zod } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

// import { trackMatomoEvent } from 'src/utils/helper';

import { toast } from 'sonner';

import { createOrder } from 'src/actions/orders';
import { validateDiscountCode } from 'src/actions/discountCodes';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutBillingInfo } from './checkout-billing-info';
import { CheckoutPaymentMethods } from './checkout-payment-methods';

// ----------------------------------------------------------------------

export const DELIVERY_OPTIONS = [
  {
    value: 1,
    label: 'حضوری',
    description: 'محصولات خریداری شده به خریدار و یا نماینده ایشان به صورت حضوری تحویل داده میشود',
    cost: 0,
  },
  {
    value: 2,
    label: 'ارسال تیپاکس',
    description: 'با توجه به اندازه و وزن بسته هزینه محاسبه و اعلام میشود',
    cost: 0,
  },
  // { value: 3, label: 'اکسپرس', description: 'تحویل 1-2 روز', cost: 2000000 },
];

export const PAYMENT_OPTIONS = [
  // {
  //   value: 'paypal',
  //   label: 'پرداخت با Paypal',
  //   description: 'شما به وب سایت PayPal هدایت می شوید تا خرید خود را به صورت ایمن انجام دهید.',
  // },
  {
    value: 1,
    label: 'درگاه پرداخت',
    description: 'پرداخت آنلاین با کارت اعتباری',
  },
  {
    value: 0,
    label: 'کارت به کارت',
    description: 'پرداخت به صورت کارت به کارت',
    checkoutDisabled: true,
  },
  // {
  //   value: 'cash',
  //   label: 'نقدا هنگام تحویل',
  //   description: 'هنگام تحویل سفارش، مبلغ را نقدی پرداخت کنید.',
  // },
];

export const PAYMENT_OPTIONS_EN = [
  // {
  //   value: 'paypal',
  //   label: 'Pay with Paypal',
  //   description: 'You will be redirected to the PayPal website to complete your purchase securely.',
  // },
  {
    value: 1,
    label: 'Payment Gateway',
    description: 'Online payment with credit card',
  },
  {
    value: 0,
    label: 'Card to Card',
    description: 'Payment via card-to-card transfer',
    checkoutDisabled: true,
  },
  // {
  //   value: 'cash',
  //   label: 'Cash on Delivery',
  //   description: 'Pay the amount in cash when your order is delivered.',
  // },
];

const CARDS_OPTIONS = [
  // { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  // { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  // { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

// ----------------------------------------------------------------------

export const PaymentSchema = zod.object({
  payment: zod.number().min(1, { message: 'روش پرداخت را انتخاب کنید !' }),
  // Not required
  delivery: zod.number(),
});

// ----------------------------------------------------------------------

export function CheckoutPayment() {
  const router = useRouter();
  const checkout = useCheckoutContext();

  const defaultValues = { delivery: checkout.typeOfShipping, payment: checkout.typeOfPayment };

  const [submitOrderLoading, setSubmitOrderLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const createOrderPayload = (other) => ({
    address_id: checkout.billing.id,
    services: checkout.services,
    guarantee: checkout.guarantee,
    businessProfit: checkout.businessProfit,
    // delivery_cost: checkout.shipping,
    // discount_amount: checkout.discount,
    discount_code: checkout.discount_code,
    items: checkout?.items?.map((i) => ({
      product_id: i.id,
      variant_id: i.variant_id,
      color: i.color,
      quantity: i.quantity,
      size: i.size,
      kind: i.kind,
      price: i.price,
      discount_price: +i.discount_price,
    })),
    ...other,
  });

  // useEffect(() => trackMatomoEvent('checkout-step', { checkoutStep: 'checkout payment' }), []);

  // console.log(checkout);

  const handleJustCreate = async () => {
    setSubmitOrderLoading(true);
    try {
      const res = await createOrder({
        ...createOrderPayload({ type_of_delivery: 0, type_of_payment: 0 }),
      });
      if (res.status === 200) {
        checkout?.resetCart();

        // trackMatomoEvent('checkout-step', { checkoutStep: 'payment gateway' });
        router.push(res?.data?.paymentUrl);
      }
    } catch (error) {
      toast.error('یه مشکلی پیش اومد');
      console.log(error);
    } finally {
      setSubmitOrderLoading(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (checkout.discount_code && checkout.subtotal)
        await validateDiscountCode({
          code: checkout.discount_code,
          total_price: checkout.subtotal,
        });
      const res = await createOrder({
        ...createOrderPayload({ type_of_delivery: data.delivery, type_of_payment: data.payment }),
        // total_cost: checkout.total,
      });
      if (res.status === 200) {
        checkout?.resetCart();

        // trackMatomoEvent('checkout-step', { checkoutStep: 'payment gateway' });
        if (data.payment === 1) router.push(res?.data?.paymentUrl);
      }
      // checkout.onNextStep();

      console.info('DATA', data);
    } catch (error) {
      toast.error('یه مشکلی پیش اومد');
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <CheckoutDelivery onApplyShipping={checkout.onApplyShipping} options={DELIVERY_OPTIONS} />

          <CheckoutPaymentMethods
            options={{
              payments: PAYMENT_OPTIONS,
              // cards: CARDS_OPTIONS,
            }}
            onApplyPayment={checkout.onApplyPayment}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={checkout.onBackStep}
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            برگشت
          </Button>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutBillingInfo billing={checkout.billing} onBackStep={checkout.onBackStep} />
          <CheckoutSummary checkout={checkout} onEdit={() => checkout.onGotoStep(0)} />
          <LoadingButton
            sx={{ my: 2 }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            تکمیل سفارش
          </LoadingButton>{' '}
          <LoadingButton
            fullWidth
            onClick={handleJustCreate}
            size="large"
            type="button"
            variant="outlined"
            loading={submitOrderLoading}
          >
            ثبت پیش فاکتور
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
}
