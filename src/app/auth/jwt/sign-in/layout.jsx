import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <AuthCenteredLayout section={{ title: 'سلام، خوش آمدید' }}>{children}</AuthCenteredLayout>
    </GuestGuard>
  );
}
