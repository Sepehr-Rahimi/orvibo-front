import { useEffect } from 'react';

import Box from '@mui/material/Box';

import { Image } from 'src/components/image';
import { Lightbox, useLightBox } from 'src/components/lightbox';
import {
  Carousel,
  useCarousel,
  CarouselThumb,
  CarouselThumbs,
  CarouselArrowNumberButtons,
  CarouselArrowProgressButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

export function ProductDetailsCarousel({ images }) {
  const carousel = useCarousel({
    thumbs: {
      slidesToShow: 'auto',
    },
  });

  const slides = images?.map((img) => ({ src: img })) || [];

  const lightbox = useLightBox(slides);

  useEffect(() => {
    if (lightbox.open) {
      carousel.mainApi?.scrollTo(lightbox.selected, true);
    }
  }, [carousel.mainApi, lightbox.open, lightbox.selected]);

  return (
    <>
      <div>
        <Box sx={{ mb: 2.5, position: 'relative' }}>
          <CarouselArrowProgressButtons
            {...carousel.arrows}
            options={carousel.options}
            totalSlides={carousel.dots.dotCount}
            selectedIndex={carousel.dots.selectedIndex}
            sx={{ left: '50%', transform: 'translateX(-50%)', bottom: 16, position: 'absolute' }}
          />

          <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
            {slides.map((slide, index) => (
              <Box width={1} height={1} bgcolor="#eee" position="relative">
                <Image
                  priority={index === 0}
                  key={slide.src}
                  alt={slide.src}
                  src={slide.src}
                  ratio="1/1"
                  onClick={() => lightbox.onOpen(slide.src)}
                  sx={{ cursor: 'zoom-in', minWidth: 320, maxHeight: 600 }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        <CarouselThumbs
          ref={carousel.thumbs.thumbsRef}
          options={carousel.options?.thumbs}
          slotProps={{ disableMask: true }}
          sx={{ width: 360 }}
        >
          {slides.map((item, index) => (
            <CarouselThumb
              key={item.src}
              index={index}
              src={item.src}
              selected={index === carousel.thumbs.selectedIndex}
              onClick={() => carousel.thumbs.onClickThumb(index)}
            />
          ))}
        </CarouselThumbs>
      </div>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
    </>
  );
}
