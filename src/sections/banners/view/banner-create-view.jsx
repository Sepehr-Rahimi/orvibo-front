'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BannerNewEditForm } from '../banner-new-edit-form';

// ----------------------------------------------------------------------

export function BannerCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ایجاد بنر جدید"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'بنرها', href: paths.adminDashboard.banners.root },
          { name: 'بنر جدید' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BannerNewEditForm />
    </DashboardContent>
  );
}
