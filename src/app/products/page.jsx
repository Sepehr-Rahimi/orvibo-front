import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getCategoryAndProducts, getProducts } from 'src/actions/product-ssr';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: `لیست محصولات - ${CONFIG.site.name}`,
  canonical: `${CONFIG.site.baseURL}/${paths.product.root}`,
};

export default async function Page(params, ...p) {
  const searchParams = params?.searchParams;

  // const response = await getProducts({
  //   params: { ...searchParams, page: searchParams?.page || '1' },
  // });

  const data = await getCategoryAndProducts(true);

  return <ProductShopView products={data.data} />;
}
