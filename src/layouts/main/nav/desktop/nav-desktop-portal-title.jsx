import React from 'react';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import { paths } from 'src/routes/paths';

export const NavDesktopPortalTitle = ({ titles = [], handleTitleActive, isActive }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      gap={4}
      alignItems="center"
      sx={{
        mb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 1,
      }}
    >
      {titles.map((title) => {
        const active = isActive(title);

        return (
          <Link href={`${paths.product.byCategory(title)}`}>
            <Box
              key={title}
              onMouseEnter={() => handleTitleActive(title)}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                pb: 0.75,
                transition: theme.transitions.create(['color', 'border-color'], {
                  duration: 200,
                  easing: theme.transitions.easing.easeInOut,
                }),
                color: active ? theme.palette.grey[900] : theme.palette.grey[700],
                '&:hover': {
                  color: theme.palette.grey[900],
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: active ? '100%' : 0,
                  height: 2,
                  backgroundColor: theme.palette.grey[900],
                  transition: 'width 0.25s ease',
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: active ? 600 : 400,
                  textTransform: 'capitalize',
                  userSelect: 'none',
                }}
              >
                {title}
              </Typography>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};
