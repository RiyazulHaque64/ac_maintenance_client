import { CONFIG } from 'src/config-global';

import BlogView from './view';

// ----------------------------------------------------------------------

export const metadata = { title: `Blog - ${CONFIG.appName}` };

export default function Page() {
  return <BlogView />;
}
