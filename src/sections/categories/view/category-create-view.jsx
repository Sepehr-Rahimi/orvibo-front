'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CategoryNewEditForm } from '../category-new-edit-form';

// ----------------------------------------------------------------------

export function CategoryCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ایجاد دسته بندی جدید"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'دسته بندی ها', href: paths.adminDashboard.categories.root },
          { name: 'دسته بندی جدید' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CategoryNewEditForm />
    </DashboardContent>
  );
}
