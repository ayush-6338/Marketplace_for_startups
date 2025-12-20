import apiClient from './apiClient';

export const getMyNotifications = async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
};

export const markNotificationAsRead = async (id) => {
    const response = await apiClient.put(`/notifications/${id}/read`);
    return response.data;
};
