import { Container } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getTreeCategories } from 'src/actions/categories-ssr';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryView from 'src/sections/category/view/category-view';

export const metadata = { title: `لیست دسته بندی ها - ${CONFIG.site.name}` };

export default async function Page() {
  const { data: treeCategories } = await getTreeCategories();

  return (
    <Container>
      <CustomBreadcrumbs
        heading="لیست دسته بندی ها"
        links={[
          { name: 'خانه', href: paths.adminDashboard.root },
          { name: 'دسته بندی ها', href: paths.adminDashboard.categories.root },
          // ...parentCategories.map((p) => ({
          //   name: p.name,
          //   href: `${paths.adminDashboard.categories.root}/${p?.id}`,
          // })),
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <CategoryView treeCategories={treeCategories} />
    </Container>
  );
}
