import { CONFIG } from 'src/config-global';

import { PostCreateView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new post | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <PostCreateView />;
}
