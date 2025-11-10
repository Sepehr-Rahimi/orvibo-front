import { CONFIG } from 'src/config-global';

import { View403 } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `403 خطا - ${CONFIG.site.name}`, robots: 'noindex, nofollow' };

export default function Page() {
  return <View403 />;
}
