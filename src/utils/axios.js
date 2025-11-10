import axios from 'axios';
import { toast } from 'sonner';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.site.serverUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined') {
      toast?.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res?.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export const fetcherWithPost = async (args) => {
  try {
    const res = await axiosInstance.post(...args);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/users/me',
    signIn: '/api/users/login',
    signInAdmin: '/api/users/admin_login',
    signUp: '/api/users/signup',
    validateInfo: '/api/users/verify_signup',
  },
  brands: {
    create: '/api/brands/create',
    list: '/api/brands/list',
    one: '/api/brands/one',
    name: '/api/brands/name',
    update: '/api/brands/update',
    delete: '/api/brands/delete',
  },
  banners: {
    create: '/api/banners/create',
    list: '/api/banners/list',
    listAdmin: '/api/banners/admin_list',
    one: '/api/banners/one',
    update: '/api/banners/update',
    delete: '/api/banners/delete',
  },
  discountCodes: {
    create: '/api/discount_codes/create',
    list: '/api/discount_codes/list',
    one: '/api/discount_codes/one',
    update: '/api/discount_codes/update',
    delete: '/api/discount_codes/delete',
    validate: '/api/discount_codes/validate',
  },
  orders: {
    adminCreate: '/api/orders/adminCreate',
    create: '/api/orders/create',
    list: '/api/orders/list',
    listAdmin: '/api/orders/list/admin',
    one: '/api/orders/one',
    update: '/api/orders/update',
    delete: '/api/orders/delete',
    verify: '/api/orders/verify-payment',
  },
  addresses: {
    create: '/api/addresses/create',
    list: '/api/addresses/list',
    one: '/api/addresses/one',
    update: '/api/addresses/update',
    delete: '/api/addresses/delete',
    search: '/api/addresses/search',
  },
  categories: {
    create: '/api/categories/create',
    list: '/api/categories/list',
    all: '/api/categories/all',
    one: '/api/categories/one',
    name: '/api/categories/name',
    update: '/api/categories/update',
    parentCategories: '/api/categories/parent_categories',
    delete: '/api/categories/delete',
    treeList: '/api/categories/tree_list',
  },
  user: {
    list: '/api/users/users_list',
    updateProfile: '/api/users/update_profile',
    changePassword: '/api/users/change_password',
    resetPassword: '/api/users/reset_password',
    sendVerificationCode: '/api/verification_code/send_verification_code',
    verifyUser: '/api/users/verify_user',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  blogs: {
    list: '/api/blogs/list',
    adminList: '/api/blogs/admin_list',
    detailsByTitle: '/api/blogs/title',
    detailsByTitleAdmin: '/api/blogs/admin_title',
    detailsById: '/api/blogs/one',
    detailsByIdAdmin: '/api/blogs/admin_one',
    create: '/api/blogs/create',
    update: '/api/blogs/update',
    delete: '/api/blogs/delete',
  },
  product: {
    list: '/api/products/list',
    adminList: '/api/products/admin_list',
    one: '/api/products/one',
    name: '/api/products/name',
    adminOne: '/api/products/admin_one',
    search: '/api/products/search',
    create: '/api/products/create',
    update: '/api/products/update',
    delete: '/api/products/delete',
    deleteProductImages: '/api/products/delete_images',
    similarProduct: '/api/products/similar_products',
  },
  recommend: {
    get: '/api/recommend',
  },
  currency: {
    update: '/api/currency/update',
    get: '/api/currency/get',
  },
  bankAccount: {
    get: '/api/bank_accounts',
  },
};
