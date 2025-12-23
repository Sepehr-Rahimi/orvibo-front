'use client';

import { useMemo } from 'react';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

import { createTheme } from './create-theme';
import { RTL } from './with-settings/right-to-left';
import { schemeConfig } from './color-scheme-script';

// ----------------------------------------------------------------------

export function ThemeProvider({ children }) {
  const { currentLang } = useTranslate();

  const settings = useSettingsContext();

  const theme = useMemo(
    () => createTheme(currentLang?.systemValue, settings),
    [currentLang?.systemValue, settings]
  );

  return (
    // <AppRouterCacheProvider options={{ key: 'css' }}>
    <CssVarsProvider
      theme={theme}
      defaultMode={schemeConfig.defaultMode}
      modeStorageKey={schemeConfig.modeStorageKey}
    >
      <RTL direction={settings.direction}>{children}</RTL>
    </CssVarsProvider>
    // </AppRouterCacheProvider>
  );
}
