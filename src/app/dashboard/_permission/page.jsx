import { CONFIG } from 'src/config-global';

import { PermissionDeniedView } from 'src/sections/permission/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Permission | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <PermissionDeniedView />;
}
