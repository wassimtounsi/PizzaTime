import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('API response:', response.data);
    return response;
  } catch (error) {
    console.error(
      "Registration Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log('API response:', response.data);
    return response;
  } catch (error) {
    console.error(
      "Login Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
