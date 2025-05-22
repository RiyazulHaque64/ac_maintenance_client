import { CONFIG } from 'src/config-global';

import LoginView from './view';

// ----------------------------------------------------------------------

export const metadata = { title: `Login - ${CONFIG.appName}` };

export default function Page() {
  return <LoginView />;
}
