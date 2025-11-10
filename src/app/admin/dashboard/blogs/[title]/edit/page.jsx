import { CONFIG } from 'src/config-global';
import { getBlogByTitle } from 'src/actions/blog-ssr';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------
export const dynamic = 'force-dynamic';

export const metadata = { title: `ویرایش بلاگ | داشبورد - ${CONFIG.site.name}` };

export default async function Page({ params }) {
  const { title } = params;

  const { data: post } = await getBlogByTitle(title);

  return <PostEditView post={post} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
// const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

// export { dynamic };

// /**
//  * [2] Static exports
//  * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
//  */
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     const res = await axios.get(endpoints.post.list);

//     return res?.data.posts.map((post) => ({ title: paramCase(post.title) }));
//   }
//   return [];
// }
