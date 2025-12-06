import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getProducts } from 'src/actions/product-ssr';
import { getCategoryByName } from 'src/actions/categories-ssr';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const name = (await params)?.name;

  const { data: category } = await getCategoryByName(name);

  const category_url = `${CONFIG.site.baseURL}${paths.product.byCategory(name)}`;
  // const imageUrl = post.cover;

  return {
    title: `محصولات ${category.name} | ${CONFIG.site.name}`, // SEO title for search engines
    description: category.description || `محصولات ${category.name} در ${CONFIG.site.name}.`, // SEO description
    robots: 'index, follow',
    canonical: category_url,

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: `محصولات ${category.name} | ${CONFIG.site.name}`, // SEO title for search engines
      description: category.description || `محصولات ${category.name} در ${CONFIG.site.name}.`, // SEO description
      url: category_url, // URL of the product page
      // images: [{ url: imageUrl, alt: `عکس ${post.title} | ${CONFIG.site.name}` }], // Open Graph image (product image or default)
      // type: 'article', // Type of content
      site_name: CONFIG.site.name, // Site name for Open Graph
      // publishedTime: post.created_at,
      // authors: [CONFIG.site.name],
      // tags: post.tags,
    },

    // Twitter Card (Twitter-specific metadata)
    twitter: {
      title: `محصولات ${category.name} | ${CONFIG.site.name}`, // SEO title for search engines
      description: category.description || `محصولات ${category.name} در ${CONFIG.site.name}.`, // SEO description
      // card: 'summary_large_image', // Summary with large image
      // images: [imageUrl], // Image URL for Twitter card,
    },

    // other: {
    //   'article:published_time': post.created_at,
    //   'article:author': CONFIG.site.name,
    //   'article:tag': post.tags.join(', '),
    // },

    // Structured Data (JSON-LD for SEO)
  };
}

export default async function Page(params) {
  const searchParams = params?.searchParams;

  const response = await getProducts({
    params: {
      ...searchParams,
      page: searchParams?.page || '1',
      category_name: params?.params.name,
    },
  });

  return (
    <ProductShopView
      products={response?.products}
      // pagination={response?.pagination}
      categoryName={params?.params.name}
    />
  );
}
