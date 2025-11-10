import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  // revalidateIfStale: false,
  // revalidateOnFocus: false,
  // revalidateOnReconnect: false,
};

export const createDiscountCode = async ({
  code,
  type,
  value,
  min_order,
  max_uses,
  max_amount,
  start_date,
  end_date,
  active,
  user_specific,
}) => {
  try {
    const params = {
      code,
      type,
      value,
      min_order,
      max_uses,
      max_amount,
      start_date,
      end_date,
      active,
      user_specific,
    };

    const res = await axiosInstance.post(endpoints.discountCodes.create, params);
  } catch (error) {
    console.error('Error during creating DiscountCode:', error);
    throw error;
  }
};

export const updateDiscountCode = async ({
  code,
  type,
  value,
  min_order,
  max_uses,
  max_amount,
  start_date,
  end_date,
  active,
  user_specific,
  id,
}) => {
  try {
    const params = {
      code,
      type,
      value,
      min_order,
      max_uses,
      max_amount,
      start_date,
      end_date,
      active,
      user_specific,
      id,
    };

    const url = `${endpoints.discountCodes.update}/${id}`;

    const res = await axiosInstance.post(url, params);
  } catch (error) {
    console.error('Error during updating DiscountCode:', error);
    throw error;
  }
};
export const deleteDiscountCode = async (DiscountCodeId) => {
  try {
    const url = `${endpoints.discountCodes.delete}/${DiscountCodeId}`;

    const res = await axiosInstance.post(url);
  } catch (error) {
    console.error('Error during deleting DiscountCode:', error);
    throw error;
  }
};

export const validateDiscountCode = async ({ code, total_price }) => {
  const params = { code, total_price };
  try {
    const url = `${endpoints.discountCodes.validate}`;

    const res = await axiosInstance.post(url, params);

    return res.data;
  } catch (error) {
    console.error('Error during validating DiscountCode:', error);
    throw error;
  }
};

export function useGetDiscountCodes() {
  const url = endpoints.discountCodes.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      DiscountCodes: data?.data || [],
      DiscountCodesLoading: isLoading,
      DiscountCodesError: error,
      DiscountCodesValidating: isValidating,
      DiscountCodesEmpty: !isLoading && !data?.data.length,
      DiscountCodesMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetDiscountCode(DiscountCodeId) {
  const url = DiscountCodeId
    ? [endpoints.discountCodes.one, { params: { id: DiscountCodeId } }]
    : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      DiscountCode: data?.data || [],
      DiscountCodeLoading: isLoading,
      DiscountCodeError: error,
      DiscountCodeValidating: isValidating,
      DiscountCodeEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
