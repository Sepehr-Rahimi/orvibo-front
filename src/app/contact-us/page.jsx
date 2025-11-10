import { CONFIG } from 'src/config-global';

import { ContactView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export const metadata = { title: `ارتباط با ${CONFIG.site.name}` };

export default function Page() {
  return <ContactView />;
}
