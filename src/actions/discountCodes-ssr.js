import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getDiscountCode(discountCodeId) {
  const url = discountCodeId ? `${endpoints.discountCodes.one}/${discountCodeId}` : '';

  const res = await axios.get(url);

  return res?.data;
}
