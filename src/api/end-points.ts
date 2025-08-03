const endpoints = {
  auth: {
    login: '/auth/login',
  },
  blog: {
    create: '/blog/post',
    getAll: '/blog/posts',
    getSingle: (slug: string) => `/blog/post/${slug}`,
    update: (slug: string) => `/blog/post/${slug}`,
    delete: '/blog/delete-posts',
  },
};

export default endpoints;
