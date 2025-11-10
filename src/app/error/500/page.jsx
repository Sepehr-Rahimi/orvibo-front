import { CONFIG } from 'src/config-global';

import { View500 } from 'src/sections/error';

// ----------------------------------------------------------------------

export const metadata = { title: `500 خطا - ${CONFIG.site.name}`, robots: 'noindex, nofollow' };

export default function Page() {
  return <View500 />;
}
