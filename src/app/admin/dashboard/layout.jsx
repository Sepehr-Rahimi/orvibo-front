import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard, RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function Layout({ children }) {
  if (CONFIG.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <AuthGuard isAdmin>
      <RoleBasedGuard acceptRoles={[2]} hasContent>
        <DashboardLayout>{children}</DashboardLayout>
      </RoleBasedGuard>
    </AuthGuard>
  );
}
