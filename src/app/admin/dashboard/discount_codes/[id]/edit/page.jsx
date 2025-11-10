import { CONFIG } from 'src/config-global';
import { getDiscountCode } from 'src/actions/discountCodes-ssr';

import { NotFoundView } from 'src/sections/error';
import { DiscountCodeEditView } from 'src/sections/discountCodes/view/discount-codes-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ویرایش کد تخفیف | داشبورد - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { id } = params;

  try {
    const discountCode = await getDiscountCode(id);

    if (discountCode) return <DiscountCodeEditView discountCode={discountCode.data} />;
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
