import apiClient from './apiClient';

export const suspendUser = (userId) => {
    return apiClient.put(`/admin/users/${userId}/suspend`);
};

export const hideGig = (gigId) => {
    return apiClient.put(`/admin/gigs/${gigId}/hide`);
};

export const getAllUsers = () => {
    return apiClient.get('/admin/users');
};

export const getAllGigsAdmin = () => {
    return apiClient.get('/admin/gigs');
};
