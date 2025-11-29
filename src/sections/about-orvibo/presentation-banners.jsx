import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const VALUES = [
  'پرشور و متعهد',
  'نوآوری ناب',
  'کاوش مداوم',
  'جست‌وجوی حقیقت در عمل',
  'کاربران در اولویت',
  'بر پایه‌ی روحیه‌ی تلاش و پیشرفت',
];

const BANNERS = [
  {
    id: 1,
    image: '/assets/images/about-orvibo/banners/sec1.png',
    title: 'مأموریت',
    content: 'تسریع روند هوشمندسازی خانه‌ها در سراسر جهان با کمک فناوری و زیبایی‌شناسی',
    textColor: '#000000',
  },
  {
    id: 2,
    image: '/assets/images/about-orvibo/banners/sec2.png',
    title: 'ارزش‌ها',
    content: VALUES,
    textColor: '#ffffff',
  },
];

const ValueItem = ({ children }) => (
  <Typography
    variant="h6"
    sx={{
      fontWeight: 500,
      py: 0.5,
      position: 'relative',
    }}
  >
    {children}
  </Typography>
);

const BannerItem = ({ banner }) => (
  <Box position="relative" width="100%" height={{ xs: 600, md: 800 }} mt={3}>
    <Image
      src={banner.image}
      alt={banner.title}
      fill
      style={{ objectFit: 'cover' }}
      priority={banner.id === 1}
    />

    <Box
      position="absolute"
      top={80}
      left="50%"
      sx={{ transform: 'translateX(-50%)' }}
      px={{ xs: 3, md: 15 }}
      color={banner.textColor}
      textAlign="center"
      width="80%"
    >
      <Typography variant="h3" component="h2" mb={4} fontWeight={700}>
        {banner.title}
      </Typography>

      {typeof banner.content === 'string' ? (
        <Typography variant="h5" maxWidth="lg" lineHeight={1.8}>
          {banner.content}
        </Typography>
      ) : (
        <Grid container spacing={4} maxWidth="md">
          {banner.content.map((value, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ValueItem>{value}</ValueItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  </Box>
);

export const PresentationBanners = () => (
  <Stack spacing={0}>
    {BANNERS.map((banner) => (
      <BannerItem key={banner.id} banner={banner} />
    ))}
  </Stack>
);
