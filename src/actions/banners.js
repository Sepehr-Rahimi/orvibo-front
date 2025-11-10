import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  // revalidateIfStale: false,
  // revalidateOnFocus: false,
  // revalidateOnReconnect: false,
};

export const createBanner = async ({
  title,
  description,
  button_text,
  link,
  is_published,
  cover,
}) => {
  try {
    const params = { title, description, button_text, link, is_published, cover };

    const res = await axiosInstance.post(endpoints.banners.create, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during creating banner:', error);
    throw error;
  }
};

export const updateBanner = async ({
  title,
  description,
  button_text,
  link,
  is_published,
  cover,
  id,
}) => {
  try {
    const newCover = cover instanceof File ? cover : undefined;
    const params = { title, description, button_text, link, is_published, cover: newCover };

    const url = `${endpoints.banners.update}/${id}`;

    const res = await axiosInstance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during updating banner:', error);
    throw error;
  }
};
export const deleteBanner = async (bannerId) => {
  try {
    const url = `${endpoints.banners.delete}/${bannerId}`;

    const res = await axiosInstance.post(url);
  } catch (error) {
    console.error('Error during deleting banner:', error);
    throw error;
  }
};

export function useGetBanners(params) {
  const url = params?.isAdmin ? endpoints.banners.listAdmin : endpoints.banners.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      banners: data?.data || [],
      bannersLoading: isLoading,
      bannersError: error,
      bannersValidating: isValidating,
      bannersEmpty: !isLoading && !data?.data.length,
      bannersMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetBanner(bannerId) {
  const url = bannerId ? [endpoints.banners.one, { params: { bannerId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      banner: data?.data || [],
      bannerLoading: isLoading,
      bannerError: error,
      bannerValidating: isValidating,
      bannerEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
