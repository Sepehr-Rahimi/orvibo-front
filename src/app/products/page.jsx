import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getProducts } from 'src/actions/product-ssr';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: `لیست محصولات - ${CONFIG.site.name}`,
  canonical: `${CONFIG.site.baseURL}/${paths.product.root}`,
};

export default async function Page(params, ...p) {
  const searchParams = params?.searchParams;

  const response = await getProducts({
    params: { ...searchParams, page: searchParams?.page || '1' },
  });

  return <ProductShopView products={response?.products} pagination={response?.pagination} />;
}
