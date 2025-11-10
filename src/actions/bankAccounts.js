import axiosInstance, { endpoints } from 'src/utils/axios';

export const getBankAccount = async () => {
  try {
    const res = await axiosInstance.get(endpoints.bankAccount.get);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
