import { CONFIG } from 'src/config-global';

import { JobCreateView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new job | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <JobCreateView />;
}
