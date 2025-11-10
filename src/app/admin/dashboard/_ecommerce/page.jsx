import { CONFIG } from 'src/config-global';

import { OverviewEcommerceView } from 'src/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------

export const metadata = { title: `E-commerce | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <OverviewEcommerceView />;
}
