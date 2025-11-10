'use client';

import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ phone, password }) => {
  try {
    const params = { phone, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const accessToken = res?.data?.accessToken;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

export const signInWithPasswordAdmin = async ({ phone, password }) => {
  try {
    const params = { phone, password };

    const res = await axios.post(endpoints.auth.signInAdmin, params);

    const accessToken = res?.data?.accessToken;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */

export const validateUserInfo = async (phone) => {
  try {
    const res = await axios.post(endpoints.auth.validateInfo, { phone });
    // console.log(res?.data);
    // console.log(res);
    if (res.status === 200) {
      return res.data;
    }
    return false;
  } catch (error) {
    console.log('error during validation : ', error);
    throw error;
  }
};
export const signUp = async ({ phone, password, firstName, lastName, code }) => {
  const params = {
    phone,
    password,
    firstName,
    lastName,
    code,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const accessToken = res?.data.user?.accessToken;

    // console.log(res?.data);
    // console.log(res);

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    localStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

export const updateProfile = async ({ firstName, lastName, email }) => {
  try {
    const params = { firstName, lastName, email };

    const res = await axios.post(endpoints.user.updateProfile, params);

    return res;
  } catch (error) {
    console.error('Error during updating profile:', error);
    throw error;
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const params = { currentPassword, newPassword };

    const res = await axios.post(endpoints.user.changePassword, params);

    return res;
  } catch (error) {
    console.error('Error during changing password:', error);
    throw error;
  }
};

export const resetPassword = async ({ password, phone_or_email, code }) => {
  try {
    const params = { password, phone_or_email, code };

    const res = await axios.post(endpoints.user.resetPassword, params);

    return res;
  } catch (error) {
    console.error('Error during reseting password:', error);
    throw error;
  }
};

export const sendVerificationCode = async ({ phone_or_email }) => {
  try {
    const params = { phone_or_email };

    const res = await axios.post(endpoints.user.sendVerificationCode, params);

    return res;
  } catch (error) {
    console.error('Error during reseting password:', error);
    throw error;
  }
};

export const verifyUser = async ({ phone_or_email, code }) => {
  try {
    const params = { phone_or_email, code };

    const res = await axios.post(endpoints.user.verifyUser, params);

    return res;
  } catch (error) {
    console.error('Error during verifying user:', error);
    throw error;
  }
};
