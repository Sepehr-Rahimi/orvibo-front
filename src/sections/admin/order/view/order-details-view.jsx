'use client';

import { useCallback, useState } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { userRoleIs } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { updateOrder } from 'src/actions/orders';
import { DashboardContent } from 'src/layouts/dashboard';
import { ORDER_PAYMENT_STATUS, ORDER_STATUS_OPTIONS } from 'src/_mock';

import { useAuthContext } from 'src/auth/hooks';

import { OrderDetailsInfo } from '../order-details-info';
import { OrderDetailsItems } from '../order-details-item';
import { OrderDetailsToolbar } from '../order-details-toolbar';
import { AdminPrintOrderSocials } from '../admin-print-order-socials';
import { OrderDetailsBankAccounts } from '../order-details-bankaccount';

// ----------------------------------------------------------------------

export function OrderDetailsView({ order, orderMutate }) {
  // console.log(order);
  const { user } = useAuthContext();
  const userRole = user?.role;
  const { roles } = CONFIG;
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
        userRole={userRole}
        choosedAccount={choosedAccount}
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
        {userRoleIs([roles.admin, roles.seller], userRole) && (
          <Grid xs={12} md={8}>
            <OrderDetailsBankAccounts
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
