'use client';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { OrderDetailsInfo } from '../order-details-info';
import { OrderDetailsItems } from '../order-details-item';
import { OrderDetailsToolbar } from '../order-details-toolbar';

// ----------------------------------------------------------------------

export function OrderDetailsView({ order }) {
  // const [status, setStatus] = useState(order?.status);

  // const handleChangeStatus = useCallback((newValue) => {
  //   setStatus(newValue);
  // }, []);

  return (
    <DashboardContent>
      <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber={order?.id}
        createdAt={order?.created_at}
        status={order.status}
        // onChangeStatus={handleChangeStatus}
        statusOptions={ORDER_STATUS_OPTIONS}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={order?.order_items}
              // taxes={order?.taxes}
              shipping={order?.delivery_cost}
              discount={order?.discount_amount}
              // subtotal={order?.subtotal}
              totalAmount={order?.total_cost}
            />

            {/* <OrderDetailsHistory history={order?.history} /> */}
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <OrderDetailsInfo order={order} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
