import { CONFIG } from 'src/config-global';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `404 خطا - ${CONFIG.site.name}`, robots: 'noindex, nofollow' };

export default function Page() {
  return <NotFoundView />;
}
