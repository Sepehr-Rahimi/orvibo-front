import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getBanners() {
  const res = await axios.get(endpoints.banners.list);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getBanner(bannerId) {
  const url = bannerId ? `${endpoints.banners.one}/${bannerId}` : '';

  const res = await axios.get(url);

  return res?.data;
}
