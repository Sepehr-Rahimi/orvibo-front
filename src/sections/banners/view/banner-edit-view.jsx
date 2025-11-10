'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BannerNewEditForm } from '../banner-new-edit-form';

// ----------------------------------------------------------------------

export function BannerEditView({ banner }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ویرایش بنر"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'بنرها', href: paths.adminDashboard.banners.root },
          { name: banner?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BannerNewEditForm currentBanner={banner} />
    </DashboardContent>
  );
}
