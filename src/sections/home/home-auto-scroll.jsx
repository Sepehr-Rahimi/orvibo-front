import AutoScroll from 'embla-carousel-auto-scroll';

import Box from '@mui/material/Box';

// import { Image } from 'src/components/image';
import { Carousel, useCarousel } from 'src/components/carousel';
import Image from 'next/image';

// ----------------------------------------------------------------------

export function HomeAutoScroll() {
  const workswithImages = [
    { logo_url: '/assets/images/landing/workswith/applehome.png', name: 'appleHome' },
    { logo_url: '/assets/images/landing/workswith/Alexa.png', name: 'alexa' },
    { logo_url: '/assets/images/landing/workswith/googlehome.png', name: 'googleHome' },
    { logo_url: '/assets/images/landing/workswith/Matter_logo.jpg', name: 'matter' },
    {
      logo_url: '/assets/images/landing/workswith/smartthing-wwst_vertical.webp',
      name: 'smartthings',
    },
    { logo_url: '/assets/images/landing/workswith/Alexa.png', name: 'alexa' },
    { logo_url: '/assets/images/landing/workswith/applehome.png', name: 'appleHome' },
    { logo_url: '/assets/images/landing/workswith/googlehome.png', name: 'googleHome' },
    { logo_url: '/assets/images/landing/workswith/Matter_logo.jpg', name: 'matter' },
    {
      logo_url: '/assets/images/landing/workswith/smartthing-wwst_vertical.webp',
      name: 'smartthings',
    },
  ];

  const carousel = useCarousel(
    {
      loop: true,
      watchDrag: false,
    },
    [AutoScroll({ playOnInit: true })]
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel
        slotProps={{
          slide: {
            // maxHeight: '100%',
            flex: '0 0 auto',
            alignSelf: 'stretch',
            width: 'auto',
            height: '100%',
          },
          container: {
            height: 1,
          },
        }}
        carousel={carousel}
        sx={{
          borderRadius: 0,
          height: { sm: 70, xs: 40 },
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {workswithImages.map((item, index) => (
          <CarouselItem key={index} index={index} item={item} />
        ))}
      </Carousel>

      {/* <CarouselProgressBar
        {...carousel.progress}
        sx={{
          top: 20,
          right: 20,
          color: 'info.light',
          position: 'absolute',
        }}
      /> */}
    </Box>
  );
}

function CarouselItem({ item, index }) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 40, sm: 70 },
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        minHeight: 0,
        mr: { md: 5, xs: 2 },
      }}
    >
      <Image
        visibleByDefault
        alt={item.name}
        src={item.logo_url}
        height={150}
        width={200}
        style={{ height: '100%', width: 'auto' }}
      />
    </Box>
  );
}
