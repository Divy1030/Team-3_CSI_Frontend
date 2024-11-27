import axios from 'axios';

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post('https://hola-project.onrender.com/api/auth/refresh/', {
    refresh: refreshToken,
  });

  if (response.data.access) {
    return response.data.access;
  } else {
    throw new Error('Failed to refresh token');
  }
};