import { CONFIG } from 'src/config-global';

import { BannerListView } from 'src/sections/banners/view/banner-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست بنرها | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <BannerListView />;
}
