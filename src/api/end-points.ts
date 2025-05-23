const endpoints = {
  auth: {
    login: '/auth/login',
  },
  blog: {
    create: '/blog/post',
    getAll: '/blog/posts',
    getSingle: (id: string) => `/blog/post/${id}`,
    update: (id: string) => `/blog/post/${id}`,
    delete: '/blog/delete-posts',
  },
};

export default endpoints;
