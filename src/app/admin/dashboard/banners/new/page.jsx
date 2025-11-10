import { CONFIG } from 'src/config-global';

import { BannerCreateView } from 'src/sections/banners/view/banner-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `ایجاد بنر جدید | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <BannerCreateView />;
}
