import 'src/global.css';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';
import { getInitColorSchemeScript } from 'src/theme/color-scheme-script';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { detectSettings } from 'src/components/settings/server';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';
// import { GoogleAnalyticsProvider } from 'src/components/google-analytics-provider/googleAnalyticsProvider';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0';
import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify';
import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase';
import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase';
import Script from 'next/script';
import { MatomoTracker } from 'src/components/matomo/matomoTracker';
import { InitialMatomo } from 'src/components/matomo/initialMatomo';

// ----------------------------------------------------------------------

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  verification: {
    google: '9ZVyYFRTEREXrNyYvNfrASHp_nXBISmnV0uHEBx0hRw', // کدی که گوگل داده
  },
};

// e.g., in app/layout.tsx or a dedicated font file

// export const yekan = localFont({
//   src: [
//     {
//       path: '/fonts/Yekan.woff2', // preferred modern format
//       weight: '400', // normal weight
//       style: 'normal',
//     },
//     {
//       path: '/fonts/Yekan.woff', // fallback for older browsers
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '/fonts/Yekan.ttf', // optional older fallback
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   display: 'swap', // avoids invisible text while loading
//   fallback: ['Tahoma', 'Arial'], // optional fallback fonts
//   variable: '--font-yekan', // optional CSS variable for convenience
// });

export default async function RootLayout({ children }) {
  const lang = CONFIG.isStaticExport ? 'en' : await detectLanguage();

  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();

  return (
    // <html lang={lang ?? 'en'} suppressHydrationWarning>
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <InitialMatomo />
        <MatomoTracker />
        {getInitColorSchemeScript}
        {/* <GoogleAnalyticsProvider> */}
        <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
          <LocalizationProvider>
            <AuthProvider>
              <SettingsProvider
                settings={settings}
                caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <CheckoutProvider>
                      <Snackbar />
                      <ProgressBar />
                      <SettingsDrawer />
                      {children}
                    </CheckoutProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </LocalizationProvider>
        </I18nProvider>
        {/* </GoogleAnalyticsProvider> */}
      </body>
    </html>
  );
}
