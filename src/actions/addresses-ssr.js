import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getAddresses() {
  const res = await axios.get(endpoints.addresses.list);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getAddress(addressId) {
  const url = addressId ? `${endpoints.addresses.one}/${addressId}` : '';

  const res = await axios.get(url);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function searchAddressess({ search }) {
  const params = { search };
  const res = await axios.get(endpoints.addresses.search, { params });
  return res.data;
}
