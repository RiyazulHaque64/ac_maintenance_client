import React from 'react';

import { CONFIG } from 'src/config-global';

import NewBlogView from './view';

export const metadata = { title: `Create post - ${CONFIG.appName}` };

const page = () => <NewBlogView />;

export default page;
