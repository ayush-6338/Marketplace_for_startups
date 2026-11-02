import apiClient from './apiClient';

export const applyToGig = (data) => {
  return apiClient.post('/proposals', data);
};

export const getProposalsForGig = (gigId) => {
  return apiClient.get(`/proposals/gig/${gigId}`);
};

export const updateProposalStatus = (proposalId, status) => {
  return apiClient.put(`/proposals/${proposalId}/status`, { status });
};
