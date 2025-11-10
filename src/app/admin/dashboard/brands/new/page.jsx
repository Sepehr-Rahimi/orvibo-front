import { CONFIG } from 'src/config-global';

import { BrandCreateView } from 'src/sections/brands/view/brands-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ایجاد برند جدید | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <BrandCreateView />;
}
