'use client';

import Head from 'next/head';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

import { ProductDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

// export const metadata = { title: `اطلاعات محصول | داشبورد - ${CONFIG.site.name}` };

export default function Page({ params }) {
  const { id } = params;

  // const { data } = await getProduct(id, true);

  const { product: data } = useGetProduct(id, true);

  return (
    <>
      <Head>
        <title>اطلاعات محصول | داشبورد - {CONFIG.site.name}</title>
      </Head>
      <ProductDetailsView product={data} />
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
