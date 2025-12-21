import React from 'react';

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'next/image';

const banners = [
  {
    path: '/assets/images/landing/secondarybanners/secondarybanner.png',
    text: 'Smart Central Control Panel',
    link: paths.product.byCategory(`پنل های کنترل مرکزی هوشمند`),
  },
  {
    path: '/assets/images/landing/secondarybanners/secondarybanner2.png',
    text: 'Smart Switches',
    link: paths.product.byCategory('کلیدهای هوشمند'),
  },
];

export const HomeShowProductInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack width={1} direction={{ xs: 'column', sm: 'row' }} my={2} gap={{ xs: 2, md: 2 }}>
      {banners.map((singleBanner) => (
        <Box position="relative" flex={1} width={1} height={{ xs: 300, sm: 'auto' }}>
          <Image
            src={singleBanner.path}
            alt={singleBanner.text}
            width={200}
            height={200}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: '100%', height: 'auto' }}
          />
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
            <Button variant="outlined" href={singleBanner.link} sx={{ mx: 'auto' }}>
              دیدن محصولات
            </Button>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
