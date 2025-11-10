import { CONFIG } from 'src/config-global';

import { CheckoutView } from 'src/sections/checkout/view';

// ----------------------------------------------------------------------

export const metadata = { title: `تسویه حساب - ${CONFIG.site.name}`, robots: 'noindex, nofollow' };

export default function Page() {
  return <CheckoutView />;
}
