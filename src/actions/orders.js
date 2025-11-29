import useSWR from 'swr';
import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import axiosInstance, { fetcher, endpoints, fetcherWithPost } from 'src/utils/axios';
import { toast } from 'sonner';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
};

export const createOrder = async ({
  address_id,
  // total_cost,
  discount_code,
  // discount_amount,
  // delivery_cost,
  type_of_delivery,
  type_of_payment,
  services,
  guarantee,
  businessProfit,
  items,
}) => {
  try {
    const description = items.map((item) => ` ${item.product_id} * ${item.quantity} `).toString();

    const callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}${paths.product.checkout_Result}`;
    const params = {
      address_id,
      // total_cost,
      discount_code,
      // discount_amount,
      // delivery_cost,
      type_of_delivery,
      type_of_payment: type_of_payment.toString(),
      services,
      guarantee,
      businessProfit,
      items,
      description,
      callback_url,
    };

    const res = await axiosInstance.post(endpoints.orders.create, params);
    // console.log(res);
    // console.log(res.data);
    return res;
  } catch (error) {
    console.error('Error during creating order:', error);
    throw error;
  }
};

export const createAdminOrder = async ({
  address_id,
  // total_cost,
  // discount_code,
  discount_amount,
  // delivery_cost,
  type_of_delivery,
  type_of_payment,
  items,
}) => {
  try {
    const description = items.map((item) => ` ${item.product_id} * ${item.quantity} `).toString();

    // const callback_url = `${process.env.NEXT_PUBLIC_BASE_URL}${paths.product.checkout_Result}`;
    const params = {
      address_id,
      // total_cost,
      // discount_code,
      discount_amount,
      // delivery_cost,
      type_of_delivery,
      type_of_payment: type_of_payment.toString(),
      items,
      description,
      // callback_url,
    };

    const res = await axiosInstance.post(endpoints.orders.adminCreate, params);
    // console.log(res);
    // console.log(res.data);
    return res;
  } catch (error) {
    console.error('Error during creating order:', error);
    throw error;
  }
};

// export const paymentRequest = async () => {};

export const updateOrder = async ({
  id,
  address_id,
  total_cost,
  discount_code,
  discount_amount,
  delivery_cost,
  type_of_delivery,
  type_of_payment,
  payment_status,
  items,
  status,
}) => {
  try {
    const params = {
      address_id,
      total_cost,
      discount_code,
      discount_amount,
      delivery_cost,
      type_of_delivery,
      type_of_payment,
      payment_status,
      items,
      status,
    };

    const res = await axiosInstance.post(`${endpoints.orders.update}/${id}`, params);
    return res;
  } catch (error) {
    console.error('Error during updating order:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  if (!orderId) return;
  try {
    const res = await axiosInstance.post(`${endpoints.orders.delete}/${orderId}`);
    if (res.status === 200) toast.success('سفارش با موفقیت حذف شد');
  } catch (error) {
    console.log(error);
  }
};

export function useGetOrders() {
  const url = endpoints.orders.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      orders: data?.data || [],
      ordersLoading: isLoading,
      ordersError: error,
      ordersValidating: isValidating,
      ordersEmpty: !isLoading && !data?.data.length,
      ordersMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetOrdersAdmin() {
  const url = endpoints.orders.listAdmin;

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, {
    ...swrOptions,
    // provider: () => new Map(),
    // dedupingInterval: 0,
    revalidateIfStale: true,
  });

  const memoizedValue = useMemo(
    () => ({
      orders: data?.data || [],
      ordersLoading: isLoading,
      ordersError: error,
      ordersValidating: isValidating,
      ordersEmpty: !isLoading && !data?.data.length,
      ordersMutate: mutate,
    }),
    [data?.data, error, mutate, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useGetorder(orderId) {
  const url = orderId ? `${endpoints.orders.one}/${orderId}` : '';

  const { data, isLoading, error, isValidating, mutate } = useSWR(url, fetcher, {
    ...swrOptions,
    revalidateIfStale: true,
  });

  const memoizedValue = useMemo(
    () => ({
      order: data?.order || [],
      orderLoading: isLoading,
      orderError: error,
      orderValidating: isValidating,
      orderEmpty: !isLoading && !data?.order.length,
      orderMutate: mutate,
    }),
    [data?.order, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useVerifyPayment(authority) {
  const key = authority ? [endpoints.orders.verify, { authority }] : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(key, fetcherWithPost, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      verifyPayment: data || [],
      verifyPaymentLoading: isLoading,
      verifyPaymentError: error,
      verifyPaymentValidating: isValidating,
      verifyPaymentEmpty: !isLoading && !data?.length,
      verifyPaymentMutate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
