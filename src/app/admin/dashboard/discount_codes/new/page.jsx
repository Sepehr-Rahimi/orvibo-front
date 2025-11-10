import { CONFIG } from 'src/config-global';

import { DiscountCodesCreateView } from 'src/sections/discountCodes/view/discount-codes-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ایجاد کد تخفیف جدید | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <DiscountCodesCreateView />;
}
