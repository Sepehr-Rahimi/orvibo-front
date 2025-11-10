import { CONFIG } from 'src/config-global';

import { FileManagerView } from 'src/sections/file-manager/view';

// ----------------------------------------------------------------------

export const metadata = { title: `File manager | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <FileManagerView />;
}
