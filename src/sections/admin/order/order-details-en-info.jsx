import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import {
  PAYMENT_OPTIONS,
  DELIVERY_OPTIONS,
  PAYMENT_OPTIONS_EN,
} from 'src/sections/checkout/checkout-payment';

// ----------------------------------------------------------------------

export function OrderDetailsInfoEn({ order }) {
  const address = order?.address;
  const user = order?.user;

  const renderCustomer = (
    <Box className="printOff" sx={{ direction: 'rtl' }}>
      <CardHeader
        title="Customer Information"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={user?.first_name}
          // src={customer?.avatarUrl}
          sx={{ width: 48, height: 48, ml: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{`${user?.first_name} ${user?.last_name}`}</Typography>
          <Box sx={{ color: 'text.secondary' }}>{user?.phone_number}</Box>

          {/* <div>
            IP address:
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {customer?.ipAddress}
            </Box>
          </div> */}
        </Stack>
      </Stack>
    </Box>
  );

  const renderShipping = (
    <>
      <CardHeader title="Shipping Information" />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Full Name
          </Box>
          {address?.latin_full_name}
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone Number
          </Box>
          <Box component="span">{address?.phone_number}</Box>
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          {address?.address}
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Zip Code
          </Box>
          {address?.zipcode}
        </Stack>

        {/* <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Delivery Method
          </Box>
          {DELIVERY_OPTIONS.find((o) => +o.value === +order.type_of_delivery)?.label}
        </Stack> */}

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Payment Method
          </Box>
          {PAYMENT_OPTIONS_EN.find((option) => +option.value === +order.type_of_payment)?.label}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader title="Payment Method" />
      <Box display="flex" alignItems="center" sx={{ p: 3, gap: 0.5, typography: 'body2' }}>
        {PAYMENT_OPTIONS.find((p) => p.value === order.type_of_payment)?.label}
        {/* <Iconify icon="logos:mastercard" width={24} /> */}
      </Box>
    </>
  );

  return (
    <Card className="print-avoid-break" dir="ltr">
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* {renderDelivery} */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

      {/* {renderPayment} */}
    </Card>
  );
}
