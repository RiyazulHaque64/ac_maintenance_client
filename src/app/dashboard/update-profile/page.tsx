import { CONFIG } from 'src/config-global';

import { UpdateProfileView } from 'src/sections/account/update-profile-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Update profile - ${CONFIG.appName}` };

export default function Page() {
  return <UpdateProfileView />;
}
