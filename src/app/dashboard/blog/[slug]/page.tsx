import React from 'react';

import api from 'src/api/axios';
import { CONFIG } from 'src/config-global';
import endpoints from 'src/api/end-points';

import { FetchingError } from 'src/components/error/fetching-error';

import PostDetailsView from './view';

export const metadata = { title: `Post details - ${CONFIG.appName}` };

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  try {
    const res = await api.get(endpoints.blog.getSingle(slug));
    return <PostDetailsView post={res.data.data} />;
  } catch (error) {
    return (
      <FetchingError error={{ statusCode: error?.statusCode || 500, message: error?.message }} />
    );
  }
};

export default page;
