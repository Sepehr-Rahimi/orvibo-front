'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ایجاد بلاگ جدید"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'بلاگ', href: paths.adminDashboard.post.root },
          { name: 'ایجاد بلاگ' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PostNewEditForm />
    </DashboardContent>
  );
}
