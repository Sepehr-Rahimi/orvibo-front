import { CONFIG } from 'src/config-global';

import { PostListView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست بلاگ ها | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <PostListView />;
}
