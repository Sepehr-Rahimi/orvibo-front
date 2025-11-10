'use client';

import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { CartIcon } from 'src/sections/product/components/cart-icon';

import { useAuthContext } from 'src/auth/hooks';

import { Main } from '../main';
import { NavMobile } from '../main/nav/mobile';
import { NavDesktop } from '../main/nav/desktop';
import { Footer, HomeFooter } from '../main/footer';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { navData as mainNavData } from '../config-nav-main';

// ----------------------------------------------------------------------

export function ChatLayout({ sx, data, children, cartIcon }) {
  const theme = useTheme();

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery = 'md';

  const navData = data?.nav ?? mainNavData;

  const { user } = useAuthContext();

  return (
    <>
      {/* {cartIcon && <CartIcon />} */}
      <NavMobile data={navData} open={mobileNavOpen.value} onClose={mobileNavOpen.onFalse} />

      <LayoutSection
        /** **************************************
         * Header
         *************************************** */
        headerSection={
          <HeaderBase
            layoutQuery={layoutQuery}
            onOpenNav={mobileNavOpen.onTrue}
            data={{
              account: user,
            }}
            slotsDisplay={{
              account: true,
              helpLink: false,
              contacts: false,
              searchbar: true,
              workspaces: false,
              localization: false,
              notifications: false,
              settings: false,
            }}
            slots={{
              leftAreaStart: (
                <NavDesktop
                  data={navData}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: {
                      mr: 2.5,
                      display: 'flex',
                    },
                  }}
                />
              ),
            }}
          />
        }
        /** **************************************
         * Style
         *************************************** */
        sx={sx}
      >
        <Main>{children}</Main>
      </LayoutSection>
    </>
  );
}
