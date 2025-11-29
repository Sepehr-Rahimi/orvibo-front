import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';

import { NavList } from './nav-list';
import { navSectionClasses } from '../classes';
import { navSectionCssVars } from '../css-vars';
import { NavUl, NavLi, Subheader } from '../styles';

// ----------------------------------------------------------------------

export function NavSectionVertical({
  sx,
  data,
  render,
  slotProps,
  enabledRootRedirect,
  cssVars: overridesVars,
}) {
  const theme = useTheme();

  const cssVars = {
    ...navSectionCssVars.vertical(theme),
    ...overridesVars,
  };

  return (
    <Stack
      component="nav"
      className={navSectionClasses.vertical.root}
      data-mui-color-scheme="dark"
      sx={{ ...cssVars, ...sx }}
    >
      <NavUl sx={{ flex: '1 1 auto', gap: 'var(--nav-item-gap)' }}>
        {data?.map((group) => (
          <Group
            key={group.subheader ?? group.items[0].title}
            subheader={group.subheader}
            subheaderPath={group.path}
            items={group.items}
            render={render}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Group({ items, render, subheader, slotProps, enabledRootRedirect, subheaderPath }) {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const handleToggle = useCallback(() => {
    if (items?.length) setOpen((prev) => !prev);
    else router.push(subheaderPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length, subheaderPath]);

  const renderContent = (
    <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
      {items?.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={1}
          slotProps={slotProps}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );

  return (
    <NavLi>
      {subheader ? (
        <>
          <Subheader
            data-title={subheader}
            open={open}
            onClick={handleToggle}
            sx={slotProps?.subheader}
          >
            {subheader}
          </Subheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </NavLi>
  );
}
