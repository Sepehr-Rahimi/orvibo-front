import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

export const useGetUsers = (params) => {
  const url = [endpoints.user.list, { params }];

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: data?.data || [],
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
      userEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
};
