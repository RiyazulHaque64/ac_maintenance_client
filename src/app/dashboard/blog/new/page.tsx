import React from 'react';

import { CONFIG } from 'src/config-global';

import NewBlogView from './view';

export const metadata = { title: `New blog - ${CONFIG.appName}` };

const page = () => <NewBlogView />;

export default page;
