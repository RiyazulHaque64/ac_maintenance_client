import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import api from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('user');
      const returnTo = window.location.pathname;

      // Redirect to login page with return_to query param
      router.replace(`/login?return_to=${encodeURIComponent(returnTo)}`);
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  return (
    <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
      Logout
    </Button>
  );
}
