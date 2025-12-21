import { useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { fCurrency, fIrr } from 'src/utils/format-number';

import { OrderItemsWrapper } from './order-items-wrapper';
import { OrderItemsWrapperEn } from './order-details-en-items-wrapper';

// ----------------------------------------------------------------------

export function OrderDetailsItemsEn({
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
  // console.log(items);
  const params = useSearchParams();
  const printPricing = params.get('byPricing');

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ p: 3, textAlign: 'left', typography: 'body2' }}
      className={`print-avoid-break ${printPricing === 'true' && 'printOff'}`}
    >
      {[
        { label: 'Subtotal', value: subtotal },
        { label: 'Installation & Setup Services', value: servicesCost },
        { label: 'Equipment Warranty', value: guaranteeCost },
        { label: 'Shipping Cost', value: shippingCost },
        { label: 'Business Profit', value: businessProfit },
        { label: 'Discount', value: discountAmount, colorIfExists: 'error.main', prefix: '-' },
        // { label: 'Tax', value: taxes }, // Uncomment if needed
      ].map((item, index) => (
        <Stack key={index} direction="row">
          <Box sx={{ color: 'text.secondary' }}>{item.label}</Box>
          <Box
            sx={{
              width: 160,
              ...(item.colorIfExists && item.value ? { color: item.colorIfExists } : {}),
            }}
          >
            {item.value != null ? `${item.prefix || ''} ${fCurrency(item.value)}`.trim() : '-'}
          </Box>
        </Stack>
      ))}

      {/* Total */}
      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>

      {/* IRR Equivalent (optional) */}
      {/*
    <Stack direction="row" sx={{ typography: 'subtitle1' }}>
      <div>IRR Equivalent</div>
      <Box sx={{ width: 160 }}>{fIrr(irr_total_cost) || '-'}</Box>
    </Stack>
    */}
    </Stack>
  );

  return (
    <Card dir="ltr">
      <CardHeader
        // className="print-safe-card-header"
        className="print-avoid-break"
        title="Details"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />

      <OrderItemsWrapperEn items={items} />

      {renderTotal}
    </Card>
  );
}
