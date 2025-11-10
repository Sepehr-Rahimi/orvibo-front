import { useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  const { method } = CONFIG.auth;

  const searchParams = useSearchParams();

  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const signInPath = {
    jwt: paths.auth.jwt.signIn,
    auth0: paths.auth.auth0.signIn,
    amplify: paths.auth.amplify.signIn,
    firebase: paths.auth.firebase.signIn,
    supabase: paths.auth.supabase.signIn,
  }[method];

  const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

  return (
    <Button component={RouterLink} href={href} variant="outlined" sx={sx} {...other}>
      ورود
    </Button>
  );
}
