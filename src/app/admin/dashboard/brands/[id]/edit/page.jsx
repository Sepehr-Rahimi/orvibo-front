import { CONFIG } from 'src/config-global';
import { _userList } from 'src/_mock/_user';
import { getBrand } from 'src/actions/brands-ssr';

import { NotFoundView } from 'src/sections/error';
import { BrandEditView } from 'src/sections/brands/view/brand-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ویرایش برند | داشبورد - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { id } = params;

  try {
    const brand = await getBrand(id);

    if (brand) return <BrandEditView brand={brand.data} />;
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
