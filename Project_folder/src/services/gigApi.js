import apiClient from './apiClient';

export const getAllGigs = () => {
  return apiClient.get('/gigs');
};

export const getGigById = (id) => {
  return apiClient.get(`/gigs/${id}`);
};

export const createGig = (data) => {
  return apiClient.post('/gigs', data);
};
