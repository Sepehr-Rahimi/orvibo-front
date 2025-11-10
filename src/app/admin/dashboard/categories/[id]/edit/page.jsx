import { CONFIG } from 'src/config-global';
import { _userList } from 'src/_mock/_user';
import { getCategory } from 'src/actions/categories-ssr';

import { NotFoundView } from 'src/sections/error';
import { CategoryEditView } from 'src/sections/categories/view/category-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ویرایش دسته بندی | داشبورد - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { id } = params;

  try {
    const category = await getCategory(id);

    if (category) return <CategoryEditView category={category.data} />;
  } catch (error) {
    return <NotFoundView />;
  }
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    return _userList.map((user) => ({ id: user.id }));
  }
  return [];
}
