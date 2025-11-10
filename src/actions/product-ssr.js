import axiosInstance, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getProducts(props) {
  const res = await axiosInstance.get(endpoints.product.list, {
    params: props?.params,
  });

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getProduct(id, isAdmin) {
  const URL = id ? `${isAdmin ? endpoints.product.adminOne : endpoints.product.one}/${id}` : '';

  const res = await axiosInstance.get(URL);

  return res?.data;
}

export async function getProductByName(name) {
  const URL = name ? `${endpoints.product.name}/${name}` : '';

  const res = await axiosInstance.get(URL);

  return res?.data;
}

export async function getProductBySlug(slug) {
  const URL = slug ? `${endpoints.product.slug}/${slug}` : '';

  const res = await axiosInstance.get(URL);

  return res?.data;
}

export async function getSimilarProducts(productId) {
  if (!productId) {
    return [];
  }
  try {
    const url = `${endpoints.product.similarProduct}/?id=${productId}`;
    const res = await axiosInstance.get(url);
    if (res.status === 200) return res.data.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}
