import { CONFIG } from 'src/config-global';

import { JwtForgetPasswordView } from 'src/sections/auth/jwt/jwt-forget-password-view';

// ----------------------------------------------------------------------

export const metadata = { title: `فراموشی رمز عبور - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtForgetPasswordView />;
}
