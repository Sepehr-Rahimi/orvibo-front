import { CONFIG } from 'src/config-global';

import { JwtSignInView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `ورود به حساب کاربری - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtSignInView />;
}
