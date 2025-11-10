import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getBlogs, getBlogByTitle } from 'src/actions/blog-ssr';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const title = (await params)?.title;

  const { data: post } = await getBlogByTitle(title);

  const postUrl = `${CONFIG.site.baseURL}${paths.blog.details(title)}`;
  const imageUrl = post.cover;

  return {
    title: `${post.title} | ${CONFIG.site.name}`, // SEO title for search engines
    description: post.summary || `بلاگ ${post.title} در ${CONFIG.site.name}.`, // SEO description
    robots: 'index, follow',

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: `${post.title} | ${CONFIG.site.name}`, // Open Graph title
      description: post.summary || `بلاگ ${post.title} در ${CONFIG.site.name}.`, // SEO description
      url: postUrl, // URL of the product page
      images: [{ url: imageUrl, alt: `عکس ${post.title} | ${CONFIG.site.name}` }], // Open Graph image (product image or default)
      type: 'article', // Type of content
      site_name: CONFIG.site.name, // Site name for Open Graph
      publishedTime: post.created_at,
      authors: [CONFIG.site.name],
      tags: post.tags,
    },

    // Twitter Card (Twitter-specific metadata)
    twitter: {
      card: 'summary_large_image', // Summary with large image
      title: `${post.title} | ${CONFIG.site.name}`, // Open Graph title
      description: post.summary || `بلاگ ${post.title} در ${CONFIG.site.name}.`, // SEO description
      images: [imageUrl], // Image URL for Twitter card,
    },

    other: {
      'article:published_time': post.created_at,
      'article:author': CONFIG.site.name,
      'article:tag': post.tags.join(', '),
    },

    // Structured Data (JSON-LD for SEO)
  };
}

export default async function Page({ params }) {
  const { title } = params;

  const { data: post } = await getBlogByTitle(title);

  const { data: latestPosts } = await getBlogs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || `بلاگ ${post.title} در ${CONFIG.site.name}.`,
    image: [post.cover],
    author: {
      '@type': 'Person',
      name: CONFIG.site.name,
    },
    publisher: {
      '@type': 'Organization',
      name: CONFIG.site.name,
    },
    datePublished: post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetailsHomeView post={post} latestPosts={latestPosts} />;
    </>
  );
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
// export async function generateStaticParams() {
//   if (CONFIG.isStaticExport) {
//     const res = await axios.get(endpoints.post.list);
//     return res?.data.posts.map((post) => ({ title: paramCase(post.title) }));
//   }
//   return [];
// }
