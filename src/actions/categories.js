import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  // revalidateIfStale: false,
  // revalidateOnFocus: false,
  // revalidateOnReconnect: false,
};

export const createCategory = async ({ name, image_url, parent_id, description }) => {
  try {
    const params = { name, image_url, description, parent_id };

    const res = await axiosInstance.post(endpoints.categories.create, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during create category:', error);
    throw error;
  }
};

export const updateCategory = async ({ name, image_url, description, id }) => {
  try {
    const newImage = image_url instanceof File ? image_url : undefined;

    const params = { name, image_url: newImage, description };

    const url = `${endpoints.categories.update}/${id}`;

    const res = await axiosInstance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during update  category:', error);
    throw error;
  }
};
export const deleteCategories = async (CategoriesId) => {
  try {
    const url = `${endpoints.categories.delete}/${CategoriesId}`;

    const res = await axiosInstance.post(url);
  } catch (error) {
    console.error('Error during delete category:', error);
    throw error;
  }
};

export function useGetCategories(parent_id) {
  const url = `${endpoints.categories.list}/${parent_id || ''}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      Categories: data?.data || [],
      CategoriesLoading: isLoading,
      CategoriesError: error,
      CategoriesValidating: isValidating,
      CategoriesEmpty: !isLoading && !data?.data.length,
      CategoriesMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetParentCategories(parent_id) {
  const url = `${endpoints.categories.parentCategories}/${parent_id || ''}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(parent_id ? url : null, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      Categories: data?.data || [],
      CategoriesLoading: isLoading,
      CategoriesError: error,
      CategoriesValidating: isValidating,
      CategoriesEmpty: !isLoading && !data?.data.length,
      CategoriesMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetCategory(CategoriesId) {
  const url = CategoriesId ? [endpoints.categories.one, { params: { CategoriesId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      Categories: data?.data || [],
      CategoriesLoading: isLoading,
      CategoriesError: error,
      CategoriesValidating: isValidating,
      CategoriesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetTreeCategories() {
  const { data, isLoading, error, isValidating } = useSWR(
    endpoints.categories.treeList,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      treeCategories: data?.data || [],
      treeCategoriesLoading: isLoading,
      treeCategoriesError: error,
      treeCategoriesValidating: isValidating,
      treeCategoriesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
