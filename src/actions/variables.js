import useSWR from 'swr';
import { toast } from 'sonner';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
};

export const updateCurrency = async (newCurrency) => {
  if (!newCurrency) return;
  try {
    const res = await axiosInstance.post(endpoints.variables.updateCurrency, { newCurrency });
    if (res.status === 200) toast.success(res.data.message);
    else toast.error(res.data?.message || 'somthing went wrong');
  } catch (error) {
    console.log(error);
  }
};

export const useGetIrrExchange = () => {
  const { data, error, isLoading } = useSWR(endpoints.variables.getUsdToIrr, fetcher);

  const memoizedValue = useMemo(
    () => ({
      exchange: data?.data,
      error,
      dataLoading: isLoading,
    }),
    [data?.data, error, isLoading]
  );

  return memoizedValue;
};

export const useGetCurrency = () => {
  const { data, error, isLoading } = useSWR(endpoints.variables.getCurrency, fetcher);
  //   console.log(data);

  const memoizedValue = useMemo(
    () => ({
      currency: data?.data,
      error,
      currencyLoading: isLoading,
    }),
    [data?.data, error, isLoading]
  );

  return memoizedValue;
};
