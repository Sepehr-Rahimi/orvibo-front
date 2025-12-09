import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { varAlpha, bgGradient } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { varFade, MotionContainer } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselArrowNumberButtons,
  CarouselArrowFloatButtons,
  CarouselArrowProgressButtons,
} from 'src/components/carousel';

import { IndexLabel } from './elements';

// ----------------------------------------------------------------------

export function CarouselAnimation({ data }) {
  const carousel = useCarousel({ loop: true, watchDrag: false }, [Autoplay({})]);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Carousel carousel={carousel}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            index={index}
            item={item}
            selected={index === carousel.dots.selectedIndex}
          />
        ))}
      </Carousel>

      <CarouselArrowProgressButtons
        {...carousel.arrows}
        options={carousel.options}
        totalSlides={carousel.dots.dotCount}
        selectedIndex={carousel.dots.selectedIndex}
        sx={{ bottom: 16, left: '50%', transform: 'translateX(-50%)', position: 'absolute' }}
      />
    </Box>
  );
}

function CarouselItem({ item, index, selected }) {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative' }}>
      {/* <IndexLabel index={index + 1} /> */}

      <Image
        visibleByDefault
        priority={index === 0}
        alt={item.title}
        src={item.cover}
        ratio={{ xs: '16/8', sm: '16/7' }}
      />

      <Box
        sx={{
          // ...bgGradient({
          //   color: `to top, ${theme.vars.palette.grey[900]}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0)}`,
          // }),
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
        }}
      />

      <Box
        component={MotionContainer}
        animate={selected}
        action
        sx={{
          p: 3,
          left: 0,
          width: 1,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }}
        dir="rtl"
      >
        {item?.title && (
          <m.div variants={varFade().inRight}>
            <Typography
              noWrap
              sx={{
                mb: 1,
                typography: { xs: 'subtitle1', md: 'h3' },
              }}
              style={{ textAlign: 'right' }}
            >
              {item.title}
            </Typography>
          </m.div>
        )}

        {item?.description && (
          <m.div variants={varFade().inRight}>
            <Typography noWrap variant="body2" style={{ textAlign: 'right' }}>
              {item.description}
            </Typography>
          </m.div>
        )}

        {item?.button_text && (
          <m.div variants={varFade().inRight}>
            <Button
              color="primary"
              variant="contained"
              sx={{
                mt: { md: 3, xs: 1 },
                display: 'block',
                width: 'max-content',
                fontSize: { xs: 10, md: 14 },
              }}
              target="_blank"
              href={item.link}
            >
              {item.button_text}
            </Button>
          </m.div>
        )}
      </Box>
    </Box>
  );
}
