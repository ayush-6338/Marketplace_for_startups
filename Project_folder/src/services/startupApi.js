import apiClient from './apiClient';

export const getAllStartups = () => {
  return apiClient.get('/startups');
};

export const getStartupById = (id) => {
  return apiClient.get(`/startups/${id}`);
};

export const createStartup = (data) => {
  return apiClient.post('/startups', data);
};
