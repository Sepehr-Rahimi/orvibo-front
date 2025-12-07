import { toast } from 'sonner';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency, fIrr } from 'src/utils/format-number';
import { calculatePercentage } from 'src/utils/helper';

import { useGetIrrExchange } from 'src/actions/variables';
import { validateDiscountCode } from 'src/actions/discountCodes';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';

// ----------------------------------------------------------------------

const other_payments = (checkout) => [
  { title: 'جمع تجهیزات', value: fCurrency(checkout.subtotal) },
  { title: 'هزینه حمل و ترخیص', value: fCurrency(checkout.shipping) },
  { title: 'گارانتی تجهیزات', value: fCurrency(checkout.guarantee) },
  { title: 'خدمات نصب و راه اندازی', value: fCurrency(checkout.services) },
  { title: 'سود بازرگانی', value: fCurrency(checkout.businessProfit) },
];

export function CheckoutSummary({ checkout }) {
  const { shipping, subtotal, onApplyDiscount, discount, onEdit, total } = checkout;
  const displayShipping = shipping !== null ? '-' : '-';

  const [discount_code, setDiscount_code] = useState(checkout.discount_code);

  const { exchange, dataLoading } = useGetIrrExchange();
  const irrExchange = fIrr(Math.round(total * exchange));

  const handleApplyDiscount = async () => {
    try {
      const result = await validateDiscountCode({ code: discount_code, total_price: subtotal });

      const discountAmount = result.discount_amount;

      onApplyDiscount(discountAmount, discount_code);
      toast.success('کد تخفیف اعمال شد.');
      // console.log(result);
    } catch (error) {
      onApplyDiscount(0, '');
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="خلاصه سفارش"
        action={
          onEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="solar:pen-bold" />}>
              ویرایش
            </Button>
          )
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {other_payments(checkout).map((item) => (
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              {item.title}
            </Typography>
            <Typography component="span" variant="subtitle2">
              {item.value}
            </Typography>
          </Box>
        ))}

        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            تخفیف
          </Typography>
          <Typography component="span" variant="subtitle2">
            {discount ? `${fCurrency(discount)}-` : '-'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box display="flex">
          <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
            جمع کل
          </Typography>

          <Box sx={{ textAlign: 'right' }}>
            <Typography component="span" variant="subtitle1" sx={{ display: 'block' }}>
              {fCurrency(total)}
            </Typography>
            {/* <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              (در صورت وجود مالیات بر ارزش افزوده شامل می شود)
            </Typography> */}
          </Box>
        </Box>
        {exchange && !dataLoading && (
          <Box display="flex">
            <Typography component="span" variant="subtitle2" sx={{ flexGrow: 1 }}>
              معادل تومانی
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography component="span" variant="subtitle2" sx={{ display: 'block' }}>
                <Typography>{irrExchange}</Typography>
              </Typography>
            </Box>
          </Box>
        )}

        {onApplyDiscount && (
          <TextField
            fullWidth
            placeholder="کد تخفیف"
            value={discount_code}
            onChange={(e) => setDiscount_code(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary" onClick={handleApplyDiscount} sx={{ mr: -0.5 }}>
                    اعمال تخفیف
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>
    </Card>
  );
}
