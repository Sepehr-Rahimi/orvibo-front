import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { fCurrency } from 'src/utils/format-number';

import { Scrollbar } from 'src/components/scrollbar';

import { OrderItemsWrapper } from './order-items-wrapper';

// ----------------------------------------------------------------------

export function OrderDetailsItems({ taxes, shipping, discount, items = [], totalAmount }) {
  const subtotal = items.reduce((total, current) => +current.price * +current.quantity + +total, 0);

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ p: 3, textAlign: 'right', typography: 'body2' }}
      className="print-avoid-break"
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>جمع جزء</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>هزینه حمل و نقل</Box>
        <Box sx={{ width: 160, ...(shipping && { color: 'error.main' }) }}>
          {shipping ? `- ${fCurrency(shipping)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>تخفیف</Box>
        <Box sx={{ width: 160, ...(discount && { color: 'error.main' }) }}>
          {discount ? `- ${fCurrency(discount)}` : '-'}
        </Box>
      </Stack>

      {taxes && (
        <Stack direction="row">
          <Box sx={{ color: 'text.secondary' }}>مالیات</Box>
          <Box sx={{ width: 160 }}>{taxes ? fCurrency(taxes) : '-'}</Box>
        </Stack>
      )}

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>جمع کل</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader
        title="جزئیات"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />

      <Scrollbar>
        <OrderItemsWrapper items={items} />
      </Scrollbar>

      {renderTotal}
    </Card>
  );
}
