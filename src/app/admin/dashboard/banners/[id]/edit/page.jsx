import { CONFIG } from 'src/config-global';
import { getBanner } from 'src/actions/banners-ssr';

import { NotFoundView } from 'src/sections/error';
import { BannerEditView } from 'src/sections/banners/view/banner-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ویرایش بنر | داشبورد - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { id } = params;

  try {
    const banner = await getBanner(id);

    if (banner) return <BannerEditView banner={banner.data} />;
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
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     return _userList.map((user) => ({ id: user.id }));
//   }
//   return [];
// }
