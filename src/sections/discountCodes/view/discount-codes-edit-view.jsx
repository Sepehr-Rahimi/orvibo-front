'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DiscountCodesNewEditForm } from '../discount-codes-new-edit-form';

// ----------------------------------------------------------------------

export function DiscountCodeEditView({ discountCode }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ویرایش کد تخفیف"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'کدهای تخفیف', href: paths.adminDashboard.categories.root },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <DiscountCodesNewEditForm currentDiscount={discountCode} />
    </DashboardContent>
  );
}
