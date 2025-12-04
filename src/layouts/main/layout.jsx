'use client';

import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProductsAndCategory } from 'src/actions/product';

import { MatomoTracker } from 'src/components/matomo/matomoTracker';

import { CartIcon } from 'src/sections/product/components/cart-icon';

import { useAuthContext } from 'src/auth/hooks';

import { Main } from './main';
import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { navData as mainNavData } from '../config-nav-main';

// ----------------------------------------------------------------------

export function MainLayout({ sx, data, children, cartIcon, productInfo }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery = 'md';

  const { data: productsAndCat, dataLoading } = useGetProductsAndCategory(false, !isMobile);

  let displayMainNav = mainNavData();

  if (!dataLoading && productsAndCat) {
    const newItem = {
      title: 'دسته بندی',
      path: paths.category,
      children: [
        ...productsAndCat.map((navItem) =>
          navItem?.products
            ? {
                subheader: navItem?.categoryName,
                path: paths.product.byCategory(navItem.categoryName),
                items: [...navItem.products],
              }
            : {
                subheader: navItem?.categoryName,
                path: paths.product.byCategory(navItem.categoryName),
              }
        ),
      ],
    };
    displayMainNav = mainNavData(newItem);
  }
  const navData = data?.nav ?? displayMainNav;

  const { user } = useAuthContext();

  return (
    <Box>
      {/* {cartIcon && <CartIcon />} */}
      {/* <MatomoTracker product={productInfo} /> */}

      <NavMobile data={navData} open={mobileNavOpen.value} onClose={mobileNavOpen.onFalse} />

      <LayoutSection
        /* ***************************************
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
              checkout: true,
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
         * Footer
         *************************************** */
        footerSection={
          // homePage ? <HomeFooter /> :
          <Footer layoutQuery={layoutQuery} />
        }
        /** **************************************
         * Style
         *************************************** */
        sx={{ ...sx, minHeight: '100vh' }}
      >
        <Main>{children}</Main>
      </LayoutSection>
    </Box>
  );
}
