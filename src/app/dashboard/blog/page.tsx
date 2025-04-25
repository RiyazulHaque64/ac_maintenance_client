import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Blog - ${CONFIG.appName}` };

export default function Page() {
  return <BlankView title="Blog" />;
}
