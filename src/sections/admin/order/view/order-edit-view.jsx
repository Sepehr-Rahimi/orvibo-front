'use client';

import React from 'react';

import { paths } from 'src/routes/paths';

import { useGetorder } from 'src/actions/orders';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { FactorCreateEditForm } from 'src/sections/factor/factor-create-edit-form';
import { useAuthContext } from 'src/auth/hooks';

export const OrderEditView = ({ orderId }) => {
  // console.log(orderId);
  const { order, orderLoading } = useGetorder(orderId);
  // console.log(order);
  const { user } = useAuthContext();
  // console.log(user);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ویرایش فاکتور"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'ویرایش فاکتور', href: paths.adminDashboard.factor.edit(order?.id) },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {!orderLoading && <FactorCreateEditForm order={order} userId={user.id} />}
    </DashboardContent>
  );
};
