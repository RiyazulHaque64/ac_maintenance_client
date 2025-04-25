import { cookies } from 'next/headers';

import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const token = cookies().get('token')?.value;

  return (
    <AuthGuard token={token}>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
