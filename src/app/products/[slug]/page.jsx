import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getProductByName, getProductBySlug, getSimilarProducts } from 'src/actions/product-ssr';

import { ProductShopDetailsView } from 'src/sections/product/view';
import { useGetSimilarProducts } from 'src/actions/product';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const slug = (await params)?.slug;

  const { product } = await getProductBySlug(slug);
  // const {} = await getProductBySlug()

  const productUrl = `${CONFIG.site.baseURL}${paths.product.details(slug)}`;
  const imageUrl = product.images[0];

  return {
    title: `${product.name} - ${product.model} | ${CONFIG.site.name}`, // SEO title for search engines
    description: product.summary || `خرید ${product.name} در ${CONFIG.site.name}.`, // SEO description
    robots: 'index, follow',

    // for torob
    other: {
      product_id: product.id,
      product_name: product.name,
      product_price: product.discount_price || product.price,
      product_old_price: product.discount_price ? product.price : undefined,
      availability: product.stock > 0 ? 'instock' : 'outofstock',
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: `${product.name} - ${product.model} | ${CONFIG.site.name}`, // Open Graph title
      description: product.summary || `خرید ${product.name} در ${CONFIG.site.name}.`, // SEO description
      url: productUrl, // URL of the product page
      images: [
        { url: imageUrl, alt: `عکس ${product.name} - ${product.model} | ${CONFIG.site.name}` },
      ], // Open Graph image (product image or default)
      type: 'website', // Type of content
      site_name: CONFIG.site.name, // Site name for Open Graph
      locale: 'fa_IR', // Locale (adjust if needed)
      price: product.price, // Optional: price for product pages (useful for e-commerce)
      priceCurrency: 'IRR', // Currency (adjust based on your region)
    },

    // Twitter Card (Twitter-specific metadata)
    twitter: {
      card: 'summary_large_image', // Summary with large image
      title: `${product.name} - ${product.model} | ${CONFIG.site.name}`, // Title for Twitter card
      description: product.summary || `خرید ${product.name} در ${CONFIG.site.name}.`, // SEO description
      images: imageUrl, // Image URL for Twitter card
    },

    // Structured Data (JSON-LD for SEO)
  };
}
export default async function Page({ params }) {
  const { slug: productSlug } = await params;

  console.log(productSlug);

  const { product } = await getProductBySlug(productSlug);
  const similarProducts = await getSimilarProducts(product.id);

  const productUrl = `${CONFIG.site.baseURL}${paths.product.details(productSlug)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.images[0]],
    description: product.summary,
    sku: product.code,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'IRR', // Adjust currency as needed
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: CONFIG.site.name,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductShopDetailsView product={product} similarProducts={similarProducts} />
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
//     const res = await axios.get(endpoints.product.list);
//     return res?.data.products.map((product) => ({ id: product.id }));
//   }
//   return [];
// }
