import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getProducts } from 'src/actions/product-ssr';
import { getBrandByName } from 'src/actions/brands-ssr';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const name = (await params)?.name;

  const { data: brand } = await getBrandByName(name);

  const brand_url = `${CONFIG.site.baseURL}${paths.product.byBrand(name)}`;
  // const imageUrl = post.cover;

  return {
    title: ` محصولات برند ${brand.name} | ${CONFIG.site.name}`, // SEO title for search engines
    description: brand.description || ` محصولات برند ${brand.name} در ${CONFIG.site.name}.`, // SEO description
    robots: 'index, follow',
    canonical: brand_url,

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: ` محصولات برند ${brand.name} | ${CONFIG.site.name}`, // SEO title for search engines
      description: brand.description || ` محصولات برند ${brand.name} در ${CONFIG.site.name}.`, // SEO description
      url: brand_url, // URL of the product page
      // images: [{ url: imageUrl, alt: `عکس ${post.title} | ${CONFIG.site.name}` }], // Open Graph image (product image or default)
      // type: 'article', // Type of content
      site_name: CONFIG.site.name, // Site name for Open Graph
      // publishedTime: post.created_at,
      // authors: [CONFIG.site.name],
      // tags: post.tags,
    },

    // Twitter Card (Twitter-specific metadata)
    twitter: {
      title: ` محصولات برند ${brand.name} | ${CONFIG.site.name}`, // SEO title for search engines
      description: brand.description || ` محصولات برند ${brand.name} در ${CONFIG.site.name}.`, // SEO description
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

export default async function Page(params, ...p) {
  const searchParams = params?.searchParams;

  const response = await getProducts({
    params: {
      ...searchParams,
      page: searchParams?.page || '1',
      brand_name: params?.params.name,
    },
  });

  return (
    <ProductShopView
      products={response?.products}
      pagination={response?.pagination}
      brandName={params?.params.name}
    />
  );
}
