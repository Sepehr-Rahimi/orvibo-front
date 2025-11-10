import { CONFIG } from 'src/config-global';
import { getBlogs } from 'src/actions/blog-ssr';

import { PostListHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `لیست بلاگ ها - ${CONFIG.site.name}` };

export default async function Page() {
  const { data: posts } = await getBlogs();

  return <PostListHomeView posts={posts} />;
}
