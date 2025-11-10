import { CONFIG } from 'src/config-global';

import { OrderListView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست سفارشات | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <OrderListView />;
}
