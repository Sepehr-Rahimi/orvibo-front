import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';
import axios from 'axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

// ----------------------------------------------------------------------

export const createProduct = async ({
  name,
  // price,
  currency_price,
  discount_percentage,
  summary,
  colors,
  sizes,
  stock,
  slug,
  main_features,
  description,
  kinds,
  model,
  category_id,
  brand_id,
  code,
  label,
  is_published,
  images,
}) => {
  try {
    const params = {
      images,
      name,
      // price,
      currency_price,
      discount_percentage,
      summary,
      colors,
      sizes,
      stock,
      slug,
      main_features,
      description,
      kinds,
      model,
      category_id,
      brand_id,
      code,
      label,
      is_published,
    };

    // console.log('hi');

    const res = await axiosInstance.post(endpoints.product.create, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during creating product:', error);
    throw error;
  }
};
export const deleteProduct = async ({ id }) => {
  const url = `${endpoints.product.delete}/${id || ''}`;

  try {
    const res = await axiosInstance.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  } catch (error) {
    console.error('Error during creating product:', error);
    throw error;
  }
};
export const updateProduct = async ({
  name,
  // price,
  currency_price,
  discount_percentage,
  summary,
  colors,
  sizes,
  stock,
  slug,
  main_features,
  description,
  kinds,
  model,
  category_id,
  brand_id,
  code,
  label,
  is_published,
  images,
  id,
  orderImages,
}) => {
  try {
    const params = {
      images,
      name,
      // price,
      currency_price,
      discount_percentage,
      summary,
      colors,
      sizes,
      stock,
      slug,
      main_features,
      description,
      kinds,
      model,
      category_id,
      brand_id,
      code,
      label,
      is_published,
      orderImages,
    };

    const url = `${endpoints.product.update}/${id}`;

    const res = await axiosInstance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
    // console.log(res);
  } catch (error) {
    console.error('Error during creating product:', error);
    throw error;
  }
};
export const deleteProductImages = async ({ images, id }) => {
  try {
    const params = {
      images,
    };

    const url = `${endpoints.product.deleteProductImages}/${id}`;

    const res = await axiosInstance.post(url, params);
  } catch (error) {
    console.error('Error during creating product:', error);
    throw error;
  }
};

export const getAdminProductList = async (params) => {
  try {
    const res = await axiosInstance.get(endpoints.product.adminList, { params: { ...params } });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export function useGetProducts(params, isAdmin) {
  const url = [
    isAdmin ? endpoints.product.adminList : endpoints.product.list,
    {
      params: {
        ...params,
        page: 1,
      },
    },
  ];

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      pagination: data?.pagination || {},
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
      productsMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
export async function searchProducts(params) {
  const url = params.search ? `${endpoints.product.search}` : '';

  try {
    const res = await axiosInstance.get(url, { params });
    return res;
  } catch (error) {
    console.error('Error during searching product:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function useSearchProducts(params) {
  const url = params.params.search
    ? [endpoints.product.search, { page: 1, limit: 5, ...params }]
    : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.products || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.products?.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetProduct(productId, admin) {
  const url = productId
    ? `${admin ? endpoints.product.adminOne : endpoints.product.one}/${productId}`
    : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      product: data?.data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetSimilarProducts(productId) {
  const url = productId ? `${endpoints.product.similarProduct}/?id=${productId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      products: data?.data,
      productsLoading: isLoading,
      productsError: error,
      productValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
