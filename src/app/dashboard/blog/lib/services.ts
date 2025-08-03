import api from 'src/api/axios';

export const getRelatedPosts = async (slug: string) => {
  try {
    const response = await api.get(`/blog/related-posts/${slug}`);
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
