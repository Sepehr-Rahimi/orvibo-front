'use client';

import Head from 'next/head';

import { CONFIG } from 'src/config-global';
import { useGetBlogByTitle } from 'src/actions/blog';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

// export const metadata = { title: `مشاهده بلاگ | داشبورد - ${CONFIG.site.name}` };

export default function Page({ params }) {
  const { title } = params;

  const { blog: post } = useGetBlogByTitle(title, true);

  // const { data: post } = await getBlogByTitle(title, true);

  return (
    <>
      <Head>
        <title>مشاهده بلاگ | داشبورد - {CONFIG.site.name}</title>
      </Head>
      <PostDetailsView post={post} />;
    </>
  );
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
