import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavUl, NavSectionVertical } from 'src/components/nav-section';

import { NavList } from '../main/nav/mobile/nav-mobile-list';

// ----------------------------------------------------------------------

export function NavMobile({ data, open, onClose, slots, sx, topNavData, ...other }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      data-mui-color-scheme="dark"
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      {slots?.topArea ?? (
        <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
          <Logo />
        </Box>
      )}

      <Scrollbar fillContent>
        <Box component="nav" display="flex" flexDirection="column" flex="1 1 auto" sx={{ pb: 3 }}>
          <NavUl>
            {topNavData.map((list) => (
              <NavList key={list.title} data={list} />
            ))}
          </NavUl>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', marginTop: '10px' }} />

        {/* <Scrollbar> */}
        <NavSectionVertical data={data} sx={{ px: 2, flex: '1 1 auto' }} {...other} />
      </Scrollbar>
      {/* <NavUpgrade /> */}
      {/* </Scrollbar> */}

      {slots?.bottomArea}
    </Drawer>
  );
}
