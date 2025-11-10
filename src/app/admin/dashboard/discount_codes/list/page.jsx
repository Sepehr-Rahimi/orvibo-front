import { CONFIG } from 'src/config-global';

import { CategoryListView } from 'src/sections/categories/view/category-list-view';
import { DiscountCodesListView } from 'src/sections/discountCodes/view/discount-codes-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست کد تخفیف ها | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <DiscountCodesListView />;
}
