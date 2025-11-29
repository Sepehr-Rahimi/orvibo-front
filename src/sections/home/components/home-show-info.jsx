import React from 'react';

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Image } from 'src/components/image';

const banners = [
  {
    path: '/assets/images/landing/secondarybanners/secondarybanner.png',
    text: 'Smart Central Control Panel',
  },
  {
    path: '/assets/images/landing/secondarybanners/secondarybanner2.png',
    text: 'Smart Switches',
  },
];

export const HomeShowProductInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack width={1} direction={{ xs: 'column', sm: 'row' }} my={2} spacing={2}>
      {banners.map((singleBanner) => (
        <Box position="relative" flex={1} width={1}>
          <Image src={singleBanner.path} alt={singleBanner.text} ratio={isMobile && '1/1'} />
          <Box
            sx={{
              width: 1,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              left: '50%',
              top: 15,
              transform: 'translateX(-50%)',
            }}
          >
            <Typography my={2} color="white" sx={{ typography: { xs: 'h5', sm: 'h4' } }}>
              {singleBanner.text}
            </Typography>
            <Button variant="outlined" sx={{ mx: 'auto' }}>
              learn more
            </Button>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
