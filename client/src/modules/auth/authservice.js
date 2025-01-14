import apiClient from '../../api/apiclient';

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = (userData) => {
  return apiClient.post('/auth/login', userData);
};
