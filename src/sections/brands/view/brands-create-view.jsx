'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BrandNewEditForm } from '../brand-new-edit-form';

// ----------------------------------------------------------------------

export function BrandCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ایجاد برند جدید"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'برندها', href: paths.adminDashboard.brands.root },
          { name: 'برند جدید' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BrandNewEditForm />
    </DashboardContent>
  );
}
