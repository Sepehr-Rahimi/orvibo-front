import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getBrands() {
  const res = await axios.get(endpoints.brands.list);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getBrand(brandId) {
  const url = brandId ? `${endpoints.brands.one}/${brandId}` : '';

  const res = await axios.get(url);

  return res?.data;
}

export async function getBrandByName(name) {
  const url = name ? `${endpoints.brands.name}/${name}` : '';

  const res = await axios.get(url);

  return res?.data;
}
