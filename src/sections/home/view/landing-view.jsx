'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import TimeCountdown from 'src/components/time-countdown/timeCountdown';

// import { HomeAutoScroll } from 'src/sections/home/home-auto-scroll';
// import { CarouselAnimation } from 'src/sections/_examples/extra/carousel-view/carousel-animation';

// import HomeHotDeals from '../home-hot-deals';
// import HomeNewBlogs from '../home-new-blogs';
// import HomeCategories from '../home-categories';
import { useAuthContext } from 'src/auth/hooks';
import { trackMatomoEvent } from 'src/utils/helper';
import { AiSearchInput } from '../home-ai-search';
// import HomeNewProducts from '../home-new-products';

const HomeHotDeals = dynamic(() => import('../home-hot-deals'), {
  ssr: false,
});
const HomeNewProducts = dynamic(() => import('../home-new-products'), { ssr: false });
const CarouselAnimation = dynamic(
  () =>
    import('src/sections/_examples/extra/carousel-view/carousel-animation').then(
      (mode) => mode.CarouselAnimation
    ),
  { ssr: false }
);
const HomeAutoScroll = dynamic(
  () => import('src/sections/home/home-auto-scroll').then((mode) => mode.HomeAutoScroll),
  { ssr: false }
);

const HomeNewBlogs = dynamic(() => import('../home-new-blogs').then((mode) => mode.default));

const HomeCategories = dynamic(() => import('../home-categories').then((mode) => mode.default));

// const SLIDES = [...Array(5)].map((_, index) => ({
//   id: _mock.id(index),
//   title: _mock.postTitle(index),
//   coverUrl: _mock.image.cover(index),
//   description: _mock.description(index),
// }));

const LandingView = ({ featureProducts = [], banners = [] }) => {
  const tommorowDate = new Date().setHours(24, 0, 0, 0);

  // const { banners } = useGetBanners();
  // const { products, productsLoading } = useGetProducts({
  //   page: 1,
  //   limit: 4,
  //   featured: true,
  // });

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) trackMatomoEvent('signin-success', { userFullName: user?.displayName });
  });

  return (
    // const { products, productsLoading } = useGetProducts();

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, overflow: 'hidden' }}>
      <Box sx={{ aspectRatio: { xs: '4/3', sm: '16/8' }, width: '100%' }}>
        {/* Hero Section - Carousel Banner */}
        <CarouselAnimation data={banners} />
      </Box>

      <Box sx={{ mt: 4, height: 70 }}>
        <HomeAutoScroll />
      </Box>
      <AiSearchInput />
      <Stack spacing={2} sx={{ mt: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { md: 20, xs: 18 } }}
          >
            دسته بندی ها
          </Typography>
          <Button
            href={paths.category}
            variant="text"
            color="primary"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{
              fontSize: { xs: 12, md: 14 },
            }}
          >
            مشاهده بیشتر
          </Button>
        </Stack>
        <HomeCategories />
      </Stack>

      {/* Hot Deal Today Section */}
      {featureProducts && featureProducts.length > 0 && (
        <Stack spacing={2} sx={{ mt: 6 }} overflow="visible">
          <Stack
            direction="row"
            alignItems={{ md: 'center', xs: 'end' }}
            justifyContent="space-between"
          >
            <Stack
              direction={{ sx: 'column', md: 'row' }}
              spacing={2}
              alignItems={{ sx: 'start', md: 'center' }}
            >
              <Stack direction="row" spacing={1}>
                <Iconify width={30} icon="fxemoji:fire" />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontSize: { md: 20, xs: 18 } }}
                >
                  پیشنهاد ویژه امروز
                </Typography>
              </Stack>
              <TimeCountdown date={tommorowDate} showDay={false} />
            </Stack>
            <Button
              href={paths.product.hotDeals}
              variant="text"
              color="primary"
              endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              sx={{
                fontSize: { xs: 12, md: 14 },
              }}
            >
              مشاهده بیشتر
            </Button>
          </Stack>
          <HomeHotDeals products={featureProducts} />
        </Stack>
      )}

      {/* Top Products Section */}
      <Stack spacing={2} sx={{ mt: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { md: 20, xs: 18 } }}
          >
            جدید ترین محصولات
          </Typography>
          <Button
            href={paths.product.root}
            variant="text"
            color="primary"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{
              fontSize: { xs: 12, md: 14 },
            }}
          >
            مشاهده بیشتر
          </Button>
        </Stack>
        <HomeNewProducts />
      </Stack>

      <Stack spacing={2} sx={{ mt: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { md: 20, xs: 18 } }}
          >
            جدید ترین بلاگ ها
          </Typography>
          <Button
            href={paths.blogs}
            variant="text"
            color="primary"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{
              fontSize: { xs: 12, md: 14 },
            }}
          >
            مشاهده بیشتر
          </Button>
        </Stack>
        <HomeNewBlogs />
      </Stack>

      {/* Footer Section */}
      {/* <Box sx={{ mt: 6, py: 4, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Noyan Shop. All rights reserved
        </Typography>
      </Box> */}
    </Container>
  );
};
export default LandingView;
