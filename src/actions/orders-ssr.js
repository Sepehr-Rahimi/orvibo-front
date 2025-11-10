import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getOrders() {
  const res = await axios.get(endpoints.orders.list);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getOrder(orderId) {
  const url = orderId ? `${endpoints.orders.one}/${orderId}` : '';

  const res = await axios.get(url);

  return res?.data;
}
