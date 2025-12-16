import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  // revalidateIfStale: false,
  // revalidateOnFocus: false,
  // revalidateOnReconnect: false,
};

export const createAddress = async ({
  is_home,
  full_name,
  latin_full_name,
  phone_number,
  address,
  city,
  province,
  zipcode,
  is_default,
}) => {
  try {
    const params = {
      is_home,
      full_name,
      latin_full_name,
      phone_number,
      address,
      city,
      province,
      zipcode,
      is_default,
    };

    const res = await axiosInstance.post(endpoints.addresses.create, params);
  } catch (error) {
    console.error('Error during creating address:', error);
    throw error;
  }
};

export const updateAddress = async ({
  id,
  is_home,
  full_name,
  latin_full_name,
  phone_number,
  address,
  city,
  province,
  zipcode,
  is_default,
}) => {
  try {
    const params = {
      is_home,
      full_name,
      latin_full_name,
      phone_number,
      address,
      city,
      province,
      zipcode,
      is_default,
    };

    const url = `${endpoints.addresses.update}/${id}`;

    const res = await axiosInstance.post(url, params);
  } catch (error) {
    console.error('Error during updating address:', error);
    throw error;
  }
};
export const deleteAddress = async (addressId) => {
  try {
    const url = `${endpoints.addresses.delete}/${addressId}`;

    const res = await axiosInstance.post(url);
  } catch (error) {
    console.error('Error during deleting address:', error);
    throw error;
  }
};

export function useGetAddresses() {
  const url = endpoints.addresses.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      addresses: data?.addresses || [],
      addressesLoading: isLoading,
      addressesError: error,
      addressesValidating: isValidating,
      addressesEmpty: !isLoading && !data?.addresses.length,
      addressesMutate: mutate,
    }),
    [data?.addresses, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetAddress(addressId) {
  const url = addressId ? [endpoints.addresses.one, { params: { addressId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      address: data?.data || [],
      addressLoading: isLoading,
      addressError: error,
      addressValidating: isValidating,
      addressEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// export function searchAdressess() {}
