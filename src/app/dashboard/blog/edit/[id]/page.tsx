import React from 'react';

import { CONFIG } from 'src/config-global';

import EditPostView from './view';

export const metadata = { title: `Edit post - ${CONFIG.appName}` };

const page = () => <EditPostView />;

export default page;
