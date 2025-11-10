import AutoScroll from 'embla-carousel-auto-scroll';

import Box from '@mui/material/Box';

import { useGetBrands } from 'src/actions/brands';

import { Image } from 'src/components/image';
import { Carousel, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

export function HomeAutoScroll() {
  const { brands } = useGetBrands();

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
            // height: '100%',
            flex: '0 0 20%',
          },
        }}
        carousel={carousel}
        sx={{ borderRadius: 0, height: 70, alignItems: 'center', display: 'flex' }}
      >
        {[...brands, ...brands, ...brands].map((item, index) => (
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
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        mr: { md: 5, xs: 2 },
      }}
    >
      <Image
        visibleByDefault
        alt={item.name}
        src={item.logo_url}
        // ratio={{ xs: '4/3', sm: '16/10' }}
        sx={{
          filter: 'grayscale(100%) brightness(50%)',
          width: '100%',
          height: 'auto',
        }}
      />
    </Box>
  );
}
