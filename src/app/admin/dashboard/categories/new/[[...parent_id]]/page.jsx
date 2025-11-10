import { CONFIG } from 'src/config-global';

import { CategoryCreateView } from 'src/sections/categories/view/category-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ایجاد دسته بندی جدید | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <CategoryCreateView />;
}
