import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  // revalidateIfStale: false,
  // revalidateOnFocus: false,
  // revalidateOnReconnect: false,
};

export const createBrand = async ({
  name,
  logo_url,
  website_url,
  description,
  english_name,
  is_active,
}) => {
  try {
    const params = { name, logo_url, website_url, description, english_name, is_active };

    const res = await axiosInstance.post(endpoints.brands.create, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during creating brand:', error);
    throw error;
  }
};

export const updateBrand = async ({
  name,
  logo_url,
  website_url,
  description,
  english_name,
  is_active,
  id,
}) => {
  try {
    const params = { name, logo_url, website_url, description, english_name, is_active };

    const url = `${endpoints.brands.update}/${id}`;

    const res = await axiosInstance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during updating brand:', error);
    throw error;
  }
};
export const deleteBrand = async (brandId) => {
  try {
    const url = `${endpoints.brands.delete}/${brandId}`;

    const res = await axiosInstance.post(url);
  } catch (error) {
    console.error('Error during deleting brand:', error);
    throw error;
  }
};

export function useGetBrands() {
  const url = endpoints.brands.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      brands: data?.data || [],
      brandsLoading: isLoading,
      brandsError: error,
      brandsValidating: isValidating,
      brandsEmpty: !isLoading && !data?.data.length,
      brandsMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetBrand(brandId) {
  const url = brandId ? [endpoints.brands.one, { params: { brandId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      brand: data?.data || [],
      brandLoading: isLoading,
      brandError: error,
      brandValidating: isValidating,
      brandEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
