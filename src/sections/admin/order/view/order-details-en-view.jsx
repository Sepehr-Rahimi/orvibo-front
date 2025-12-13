'use client';

import { useCallback, useState } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { updateOrder } from 'src/actions/orders';
import { DashboardContent } from 'src/layouts/dashboard';
import { ORDER_PAYMENT_STATUS_EN, ORDER_STATUS_OPTIONS_EN } from 'src/_mock';

import { OrderDetailsInfo } from '../order-details-info';
import { OrderDetailsItems } from '../order-details-item';
import { AdminPrintOrderSocials } from '../admin-print-order-socials';
import { OrderDetailsBankAccounts } from '../order-details-bankaccount';
import { OrderDetailsToolbarEn } from '../order-details-en-toolbar';
import { OrderDetailsItemsEn } from '../order-details-en-item';
import { OrderDetailsInfoEn } from '../order-details-en-info';
import { OrderDetailsBankAccountsEn } from '../order-details-en-bankaccount';

// ----------------------------------------------------------------------

export function OrderDetailsViewEn({ order, orderMutate, userRole }) {
  // console.log(order);
  const [choosedAccount, setChoosedAccount] = useState(false);

  const handleChangeStatus = useCallback(
    async (newValue, label) => {
      await updateOrder({ id: order?.id, [label]: newValue });
      orderMutate();
    },
    [order?.id, orderMutate]
  );

  return (
    <DashboardContent>
      <OrderDetailsToolbarEn
        backLink={paths.adminDashboard.order.root}
        orderNumber={order?.id}
        createdAt={order?.created_at}
        status={order?.status}
        paymentStatus={order?.payment_status}
        onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS_EN}
        paymentStatusOptions={ORDER_PAYMENT_STATUS_EN}
        typeOfPayment={order.type_of_payment}
        isAdmin={userRole === 2}
        choosedAccount={choosedAccount}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8} className="print-items">
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItemsEn
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
          {order && <OrderDetailsInfoEn order={order} />}
        </Grid>
        {userRole === 2 && (
          <Grid xs={12} md={8}>
            <OrderDetailsBankAccountsEn
              choosedAccount={choosedAccount}
              setChoosedAccount={setChoosedAccount}
            />
          </Grid>
        )}
      </Grid>
      <Box className="print-only" sx={{ mt: 5 }}>
        <AdminPrintOrderSocials />
      </Box>
    </DashboardContent>
  );
}
