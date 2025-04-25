'use client';

import type { IUser } from 'src/types/user';

import { useMemo, useState, useEffect } from 'react';

import { AuthContext } from '../auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const status = 'sdauthenticated';
  const memoizedValue = useMemo(
    () => ({
      user,
      loading: false,
      authenticated: false,
      unauthenticated: false,
    }),
    [user]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
