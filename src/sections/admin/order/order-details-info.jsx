import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { PAYMENT_OPTIONS, DELIVERY_OPTIONS } from 'src/sections/checkout/checkout-payment';

// ----------------------------------------------------------------------

export function OrderDetailsInfo({ order }) {
  const address = order?.address;
  const user = order?.user;
  const renderCustomer = (
    <Box className="printOff">
      <CardHeader
        title="اطلاعات کاربر"
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
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{`${user?.first_name} ${user?.last_name}`}</Typography>

          <Box sx={{ color: 'text.secondary', direction: 'rtl' }}>{user?.phone_number}</Box>

          {/* <div>
            IP address:
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {customer?.ipAddress}
            </Box>
          </div> */}

          {/* <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ mt: 1 }}
          >
            Add to Blacklist
          </Button> */}
        </Stack>
      </Stack>
    </Box>
  );

  // const renderDelivery = (
  //   <>
  //     <CardHeader
  //       title="Delivery"
  //       action={
  //         <IconButton>
  //           <Iconify icon="solar:pen-bold" />
  //         </IconButton>
  //       }
  //     />
  //     <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
  //       <Stack direction="row" alignItems="center">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Ship by
  //         </Box>
  //         {delivery?.shipBy}
  //       </Stack>
  //       <Stack direction="row" alignItems="center">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Speedy
  //         </Box>
  //         {delivery?.speedy}
  //       </Stack>
  //       <Stack direction="row" alignItems="center">
  //         <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
  //           Tracking No.
  //         </Box>
  //         <Link underline="always" color="inherit">
  //           {delivery?.trackingNumber}
  //         </Link>
  //       </Stack>
  //     </Stack>
  //   </>
  // );

  const renderShipping = (
    <>
      <CardHeader
        title="اطلاعات مشتری "
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            نام و نام خانوادگی
          </Box>
          {address?.full_name}
        </Stack>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            شماره موبایل
          </Box>
          <Box component="span" sx={{ direction: 'rtl' }}>
            {address?.phone_number}
          </Box>
        </Stack>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            آدرس
          </Box>
          {address?.address}
        </Stack>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            کد پستی
          </Box>
          {address?.zipcode}
        </Stack>
        {/* <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            نحوه ارسال
          </Box>
          {DELIVERY_OPTIONS.find((o) => +o.value === +order.type_of_delivery)?.label}
        </Stack> */}
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            نحوه پرداخت
          </Box>
          {PAYMENT_OPTIONS.find((option) => +option.value === +order.type_of_payment)?.label}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="نحوه پرداخت"
        // action={
        //   <IconButton>
        //     <Iconify icon="solar:pen-bold" />
        //   </IconButton>
        // }
      />
      <Box
        display="flex"
        alignItems="center"
        // justifyContent="flex-end"
        sx={{ p: 3, gap: 0.5, typography: 'body2' }}
      >
        {PAYMENT_OPTIONS.find((p) => p.value === order.type_of_payment)?.label}
        {/* <Iconify icon="logos:mastercard" width={24} /> */}
      </Box>
    </>
  );

  return (
    <Card className=" print-avoid-break">
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
