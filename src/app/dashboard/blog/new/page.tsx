import React from 'react';

import { CONFIG } from 'src/config-global';

import NewBlogView from 'src/sections/blog/new-blog-view';

export const metadata = { title: `New blog - ${CONFIG.appName}` };

const page = () => <NewBlogView />;

export default page;
