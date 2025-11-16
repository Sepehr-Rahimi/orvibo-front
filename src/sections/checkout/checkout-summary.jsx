import { toast } from 'sonner';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from 'src/utils/format-number';
import { calculatePercentage } from 'src/utils/helper';

import { validateDiscountCode } from 'src/actions/discountCodes';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';

// ----------------------------------------------------------------------

export function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  onApplyDiscount,
  guarantee,
  services,
}) {
  const displayShipping = shipping !== null ? '-' : '-';

  const checkout = useCheckoutContext();

  const [discount_code, setDiscount_code] = useState(checkout.discount_code);

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
        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            جمع جزء
          </Typography>
          <Typography component="span" variant="subtitle2">
            {fCurrency(subtotal)}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            هزینه حمل و ترخیص
          </Typography>
          <Typography component="span" variant="subtitle2">
            {fCurrency(calculatePercentage(40, subtotal))}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            گارانتی تجهیزات
          </Typography>
          <Typography component="span" variant="subtitle2">
            {guarantee ? fCurrency(guarantee) : displayShipping}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            خدمات نصب و راه اندازی
          </Typography>
          <Typography component="span" variant="subtitle2">
            {services ? fCurrency(services) : displayShipping}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            سود بازرگانی
          </Typography>
          <Typography component="span" variant="subtitle2">
            {fCurrency(calculatePercentage(10, subtotal))}
          </Typography>
        </Box>

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
            <Typography
              component="span"
              variant="subtitle1"
              sx={{ display: 'block', color: 'white' }}
            >
              {fCurrency(total)}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              (در صورت وجود مالیات بر ارزش افزوده شامل می شود)
            </Typography>
          </Box>
        </Box>

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
