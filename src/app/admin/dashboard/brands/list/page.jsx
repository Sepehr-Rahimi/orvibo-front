import { CONFIG } from 'src/config-global';

import { BrandListView } from 'src/sections/brands/view/brand-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست برندها | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <BrandListView />;
}
