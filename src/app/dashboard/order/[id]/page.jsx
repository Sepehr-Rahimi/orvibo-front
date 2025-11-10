'use client';

import Head from 'next/head';

import { CONFIG } from 'src/config-global';
import { useGetorder } from 'src/actions/orders';
import { OrderDetailsView } from 'src/sections/admin/order/view';
import { useAuthContext } from 'src/auth/hooks';

// import { OrderDetailsView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function Page({ params }) {
  const { id } = params;

  // const data = await getOrder(id);

  const { order, orderMutate } = useGetorder(id);

  const { user } = useAuthContext();

  return (
    <>
      <Head>
        <title>اطلاعات سفارش | داشبورد - {CONFIG.site.name}</title>
      </Head>
      <OrderDetailsView userRole={user.role} order={order} orderMutate={orderMutate} />;
    </>
  );
}
// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
// const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

// export { dynamic };

// /**
//  * [2] Static exports
//  * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
//  */
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     return _orders.map((order) => ({ id: order.id }));
//   }
//   return [];
// }
