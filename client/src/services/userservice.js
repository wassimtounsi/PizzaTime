import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const addUser = async (userData) => {
  return await axios.post(API_URL, userData);
};

export const updateUser = async (userId, userData) => {
  return await axios.put(`${API_URL}/${userId}`, userData);
};

export const deleteUser = async (userId) => {
  return await axios.delete(`${API_URL}/${userId}`);
};

