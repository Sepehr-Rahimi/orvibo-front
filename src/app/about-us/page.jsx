import { CONFIG } from 'src/config-global';

import { DirectOrderPage } from 'src/sections/about/view';

// ----------------------------------------------------------------------

export const metadata = { title: `درباره ${CONFIG.site.name}` };

export default function Page() {
  return <DirectOrderPage />;
}
