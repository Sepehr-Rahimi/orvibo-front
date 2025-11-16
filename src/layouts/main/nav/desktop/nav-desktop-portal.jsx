import { Box, Fade, Portal, useTheme } from '@mui/material';
import React, { memo, useState } from 'react';
import { NavUl } from 'src/components/nav-section';
import { paper } from 'src/theme/styles';
import { NavDesktopPortalTitle } from './nav-desktop-portal-title';
import { NavDesktopPortalItems } from './nav-desktop-portal-items';

export const NavDesktopPortal = memo(({ handleOpenMenu, handleCloseMenu, clientRect, data }) => {
  const theme = useTheme();

  const [activeItems, setActiveItems] = useState(data[0].subheader);
  return (
    <Portal>
      <Fade in>
        <Box
          onMouseEnter={handleOpenMenu}
          onMouseLeave={handleCloseMenu}
          sx={{
            pt: 0.5,
            left: 0,
            right: 0,
            mx: 'auto',
            position: 'fixed',
            zIndex: theme.zIndex.modal,
            // maxWidth: theme.breakpoints.values.lg,
            width: '100%',
            top: Math.round(clientRect.top + clientRect.height),
          }}
        >
          <Box
            component="nav"
            sx={{
              // ...paper({ theme, dropdown: true }),
              bgcolor: theme.palette.common.white,
              borderRadius: 0,
              p: theme.spacing(5, 1, 1, 4),
            }}
          >
            <NavDesktopPortalTitle
              titles={data.map((item) => item.subheader)}
              handleTitleActive={(title) => setActiveItems(title)}
              isActive={(title) => activeItems === title}
            />
            {data.map((item) =>
              activeItems === item.subheader ? <NavDesktopPortalItems items={item?.items} /> : null
            )}
          </Box>
        </Box>
      </Fade>
    </Portal>
  );
});
