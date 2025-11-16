import { useRef, useState, useEffect, useCallback } from 'react';

import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
import { isExternalLink, removeLastSlash } from 'src/routes/utils';

import { NavLi, NavUl } from 'src/components/nav-section';

import { NavDesktopPortal } from './nav-desktop-portal';
import { NavItem, NavItemDashboard } from './nav-desktop-item';

// ----------------------------------------------------------------------

export function NavList({ data }) {
  const theme = useTheme();

  const navItemRef = useRef(null);

  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);

  const active = useActiveLink(data.path, !!data.children);

  const [clientRect, setClientRect] = useState({ top: 0, height: 0 });

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu(true);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const renderNavItem = (
    <NavItem
      ref={navItemRef}
      // slots
      title={data.title}
      path={data.path}
      // state
      active={active}
      hasChild={!!data.children}
      open={data.children && !!openMenu}
      externalLink={isExternalLink(data.path)}
      isAi={data.isAi}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
    />
  );

  const handleGetClientRect = useCallback(() => {
    const element = navItemRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      setClientRect({ top: rect.top - 6, height: rect.height });
    }
  }, []);

  useEffect(() => {
    handleGetClientRect();

    window.addEventListener('scroll', handleGetClientRect);

    return () => {
      window.removeEventListener('scroll', handleGetClientRect);
    };
  }, [handleGetClientRect]);

  if (data.children) {
    return (
      <NavLi sx={{ height: 1 }}>
        {renderNavItem}

        {openMenu && (
          <NavDesktopPortal
            data={data.children}
            clientRect={clientRect}
            handleCloseMenu={handleCloseMenu}
            handleOpenMenu={handleOpenMenu}
          />
        )}
      </NavLi>
    );
  }

  return <NavLi sx={{ height: 1 }}>{renderNavItem}</NavLi>;
}

// ----------------------------------------------------------------------

function NavSubList({ data, subheader, sx, path, ...other }) {
  const pathname = usePathname();

  const isDashboard = subheader === 'Dashboard';

  const [productRender, setProductRender] = useState();

  return (
    <Stack
      component={NavLi}
      alignItems="flex-start"
      sx={{
        flex: '1 1 auto',
        ...(isDashboard && { maxWidth: { md: 1 / 3, lg: 540 } }),
        ...sx,
      }}
      {...other}
    >
      <NavUl>
        <ListSubheader
          disableSticky
          disableGutters
          sx={{ fontSize: 11, color: 'text.primary', typography: 'overline' }}
        >
          <Link href={paths.product.byCategory(subheader)}>{subheader}</Link>
        </ListSubheader>

        {data.map((item) =>
          isDashboard ? (
            <NavLi key={item.title} sx={{ mt: 1.5 }}>
              <NavItemDashboard path={item.path} />
            </NavLi>
          ) : (
            <NavLi key={item.title} sx={{ mt: 1.5 }}>
              <NavItem
                subItem
                title={item.title}
                path={item.path}
                active={item.path === removeLastSlash(pathname)}
              />
            </NavLi>
          )
        )}
      </NavUl>
    </Stack>
  );
}
