import axios from 'axios';
import { LoginInput } from '../pages/login.page';
import { RegisterInput } from '../pages/register.page';
import { ResetPasswordInput } from '../pages/resetpassword.page';
import { GenericResponse, ILoginResponse, IUserResponse } from './types';

const BASE_URL = 'http://localhost:8000/api/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>('auth/login', user);
  return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>('auth/logout');
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>('users/me');
  return response.data;
};

export const forgotPasswordFn = async (email: string) => {
  const response = await authApi.post<GenericResponse>('auth/forgotpassword',{email});
  return response.data;
};

export const resetPasswordFn = async (data: ResetPasswordInput, resetCode: string) => {
  const response = await authApi.patch<GenericResponse>(`auth/resetpassword/${resetCode}`, data);
  return response.data;
};
