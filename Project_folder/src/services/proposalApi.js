import apiClient from './apiClient';

export const applyToGig = (data) => {
  return apiClient.post('/proposals', data);
};
