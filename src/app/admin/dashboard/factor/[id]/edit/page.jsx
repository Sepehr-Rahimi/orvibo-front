import React from 'react';

import { CONFIG } from 'src/config-global';

import { OrderEditView } from 'src/sections/admin/order/view/order-edit-view';

export const metadata = { title: `ویرایش فاکتور | داشبورد - ${CONFIG.site.name}` };

const page = async ({ params }) => {
  const { id } = params;

  return <OrderEditView orderId={id} />;
};

export default page;
