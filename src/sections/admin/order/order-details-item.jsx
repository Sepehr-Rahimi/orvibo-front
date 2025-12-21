import { useParams, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { fCurrency, fIrr } from 'src/utils/format-number';

import { Scrollbar } from 'src/components/scrollbar';

import { OrderItemsWrapper } from './order-items-wrapper';

// ----------------------------------------------------------------------

export function OrderDetailsItems({
  taxes,
  shipping,
  discount,
  items = [],

  costs,
}) {
  const subtotal = items.reduce((total, current) => +current.price * +current.quantity + +total, 0);
  const {
    shippingCost,
    discountAmount,
    totalAmount,
    businessProfit,
    guaranteeCost,
    servicesCost,
    irr_total_cost,
  } = costs;
  console.log(items);
  const params = useSearchParams();
  const printPricing = params.get('byPricing');

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ p: 3, textAlign: 'right', typography: 'body2' }}
      className={`print-avoid-break ${printPricing === 'true' && 'printOff'}`}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>جمع جزء</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>خدمات نصب و راه اندازی</Box>
        <Box sx={{ width: 160 }}>{servicesCost ? `${fCurrency(servicesCost)}` : '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>گارانتی تجهیزات</Box>
        <Box sx={{ width: 160 }}>{guaranteeCost ? `${fCurrency(guaranteeCost)}` : '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>هزینه حمل و نقل</Box>
        <Box sx={{ width: 160 }}>{shippingCost ? `${fCurrency(shippingCost)}` : '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>سود بازرگانی</Box>
        <Box sx={{ width: 160 }}>{businessProfit ? `${fCurrency(businessProfit)}` : '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>تخفیف</Box>
        <Box sx={{ width: 160, ...(discountAmount && { color: 'error.main' }) }}>
          {discountAmount ? `- ${fCurrency(discountAmount)}` : '-'}
        </Box>
      </Stack>

      {/* {taxes && (
        <Stack direction="row">
          <Box sx={{ color: 'text.secondary' }}>مالیات</Box>
          <Box sx={{ width: 160 }}>{taxes ? fCurrency(taxes) : '-'}</Box>
        </Stack>
      )} */}

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>جمع کل</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>معادل تومانی</div>
        <Box sx={{ width: 160 }}>{fIrr(irr_total_cost) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader
        // className="print-safe-card-header"
        className="print-avoid-break"
        title="جزئیات"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />

      <OrderItemsWrapper items={items} />

      {renderTotal}
    </Card>
  );
}
