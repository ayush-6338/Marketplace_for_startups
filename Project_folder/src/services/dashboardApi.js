import apiClient from './apiClient';

export const getMyGigs = () => {
    return apiClient.get('/gigs/my');
};

export const getMyProposals = () => {
    return apiClient.get('/proposals/my');
};

export const getAdminStats = () => {
    return apiClient.get('/admin/stats');
};
