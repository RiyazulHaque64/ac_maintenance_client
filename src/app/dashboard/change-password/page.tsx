import { CONFIG } from 'src/config-global';

import { ChangePasswordView } from 'src/sections/account/change-password-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Change password - ${CONFIG.appName}` };

export default function Page() {
  return <ChangePasswordView />;
}
