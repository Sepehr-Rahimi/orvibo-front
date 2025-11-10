'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DiscountCodesNewEditForm } from '../discount-codes-new-edit-form';

// ----------------------------------------------------------------------

export function DiscountCodesCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ایجاد کد تخفیف جدید"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'کد تخفیف ها', href: paths.adminDashboard.discountCodes.root },
          { name: 'کد تخفیف جدید' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <DiscountCodesNewEditForm />
    </DashboardContent>
  );
}
