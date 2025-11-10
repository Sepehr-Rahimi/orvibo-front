'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BrandNewEditForm } from '../brand-new-edit-form';

// ----------------------------------------------------------------------

export function BrandEditView({ brand }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ویرایش برند"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'برندها', href: paths.adminDashboard.brands.root },
          { name: brand?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BrandNewEditForm currentBrand={brand} />
    </DashboardContent>
  );
}
