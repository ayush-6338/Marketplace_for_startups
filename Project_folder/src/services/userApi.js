import apiClient from './apiClient';

export const getFreelancers = async () => {
    const response = await apiClient.get('/users/freelancers');
    return response.data;
};

export const getFavorites = async () => {
    const response = await apiClient.get('/users/favorites');
    return response.data;
};

export const toggleFavorite = async (id) => {
    const response = await apiClient.post('/users/favorites/toggle', { id });
    return response.data;
};

export const getProfile = async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await apiClient.put('/users/me', data);
    return response.data;
};

export const getPublicProfile = async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
};
