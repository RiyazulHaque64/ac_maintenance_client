import api from 'src/api/axios';

export const getTags = async () => {
  try {
    const response = await api.get('/utility/tags?limit=500');
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
