import apiClient from './apiClient';

export const signup = (data) => {
  return apiClient.post('/auth/signup', data);
};

export const login = (data) => {
  return apiClient.post('/auth/login', data);
};

export const getMe = () => {
  return apiClient.get('/auth/me');
};
