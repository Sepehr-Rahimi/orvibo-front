import { CONFIG } from 'src/config-global';

import { CategoryListView } from 'src/sections/categories/view/category-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست دسته بندی ها | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <CategoryListView />;
}
