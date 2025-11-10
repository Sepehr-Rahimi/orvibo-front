'use client';

import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

import { FactorCreateEditForm } from '../factor-create-edit-form';

export const CreateFactorView = () => {
  const { user } = useAuthContext();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ایجاد فاکتور جدید"
        links={[
          { name: 'داشبورد', href: paths.dashboard.root },
          //   { name: 'لیست سفارشات', href: paths.dashboard.order.root },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <FactorCreateEditForm userId={user.id} />
    </DashboardContent>
  );
};
