'use client';

import { useCallback } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { updateOrder } from 'src/actions/orders';
import { DashboardContent } from 'src/layouts/dashboard';
import { ORDER_PAYMENT_STATUS, ORDER_STATUS_OPTIONS } from 'src/_mock';

import { OrderDetailsInfo } from '../order-details-info';
import { OrderDetailsItems } from '../order-details-item';
import { OrderDetailsToolbar } from '../order-details-toolbar';
import { AdminPrintOrderSocials } from '../admin-print-order-socials';
import { OrderDetailsBankAccounts } from '../order-details-bankaccount';

// ----------------------------------------------------------------------

export function OrderDetailsView({ order, orderMutate, userRole }) {
  // console.log(order);
  const handleChangeStatus = useCallback(
    async (newValue, label) => {
      await updateOrder({ id: order?.id, [label]: newValue });
      orderMutate();
    },
    [order?.id, orderMutate]
  );

  return (
    <DashboardContent>
      <OrderDetailsToolbar
        backLink={paths.adminDashboard.order.root}
        orderNumber={order?.id}
        createdAt={order?.created_at}
        status={order?.status}
        paymentStatus={order?.payment_status}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
        paymentStatusOptions={ORDER_PAYMENT_STATUS}
        typeOfPayment={order.type_of_payment}
        isAdmin={userRole === 2}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8} className="print-items">
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={order?.order_items}
              costs={{
                shippingCost: order.shipping_cost,
                discountAmount: order.discount_amount,
                totalAmount: order.total_cost,
                businessProfit: order.business_profit,
                guaranteeCost: order.guarantee_cost,
                servicesCost: order.service_cost,
                irr_total_cost: order.irr_total_cost,
              }}
            />

            {/* <OrderDetailsHistory history={order?.history} /> */}
          </Stack>
        </Grid>

        <Grid xs={12} md={4} className="print-user">
          {order && <OrderDetailsInfo order={order} />}
        </Grid>
        {userRole === 2 && (
          <Grid xs={12} md={8}>
            <OrderDetailsBankAccounts />
          </Grid>
        )}
      </Grid>
      <Box className="print-only" sx={{ mt: 5 }}>
        <AdminPrintOrderSocials />
      </Box>
    </DashboardContent>
  );
}
