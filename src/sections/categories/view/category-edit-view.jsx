'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetParentCategories } from 'src/actions/categories';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CategoryNewEditForm } from '../category-new-edit-form';

// ----------------------------------------------------------------------

export function CategoryEditView({ category }) {
  const { Categories: parentCategories } = useGetParentCategories(category?.id || '');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ویرایش دسته بندی"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'دسته بندی ها', href: paths.adminDashboard.categories.root },
          ...parentCategories.map((p) => ({
            name: p.name,
            href: `${paths.adminDashboard.categories.root}/${p?.id}`,
          })),
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CategoryNewEditForm currentCategory={category} />
    </DashboardContent>
  );
}
