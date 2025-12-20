'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Box, Link } from '@mui/material';

import { calculatePercentage } from 'src/utils/helper';

import { Carousel, CarouselArrowProgressButtons, useCarousel } from '..';

const ITEM_WIDTH_PERCENTAGE = 60;
const GAP = 4;

export const CoverflowCarousel = ({ data = [] }) => {
  const carousel = useCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  // console.log(carousel.options);
  const { mainApi: emblaApi } = carousel;
  const containerRef = useRef(null);
  const [deviceWidth, setDeviceWidth] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const originalCount = data.length;
  const singleWidth = calculatePercentage(ITEM_WIDTH_PERCENTAGE, deviceWidth) + GAP;

  // On mount: scroll to first original item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollLeft = calculatePercentage(ITEM_WIDTH_PERCENTAGE, window.innerWidth) + GAP;
    setDeviceWidth(window.innerWidth);

    // snapToClosestItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!deviceWidth) return;
    const container = containerRef.current;
    container.scrollLeft =
      -singleWidth + calculatePercentage((100 - ITEM_WIDTH_PERCENTAGE) / 2, deviceWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceWidth]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    // eslint-disable-next-line consistent-return
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <Box sx={{ position: 'relative', width: 1, height: 1, direction: 'ltr', mb: 8 }}>
      <Carousel
        carousel={carousel}
        slotProps={{
          container: { width: 1 },
          slide: { flex: `0 0 ${ITEM_WIDTH_PERCENTAGE}%`, ml: { xs: GAP / 2, md: GAP } },
        }}
      >
        {data.map((singleItem, idx) => (
          <SingleCarouselItem singleItem={singleItem} idx={idx} />
        ))}
      </Carousel>
      <CarouselArrowProgressButtons
        totalSlides={originalCount}
        selectedIndex={currentIndex}
        onClickPrev={carousel.arrows.onClickPrev}
        onClickNext={carousel.arrows.onClickNext}
        disablePrev={false}
        disableNext={false}
        sx={{
          position: 'absolute',
          bottom: -50,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
          bgcolor: 'transparent',
        }}
        slotProps={{ prevBtn: { sx: { color: 'black' } }, nextBtn: { sx: { color: 'black' } } }}
        activeIndex="black"
        index="gray"
      />
    </Box>
  );
};

const SingleCarouselItem = ({ singleItem, idx }) => (
  <Box
    key={idx}
    sx={{
      position: 'relative',
      width: 1,
      height: 500,
      flexShrink: 0,
    }}
  >
    <Image
      src={singleItem.image}
      alt="category carousel image"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: 'cover' }}
      draggable={false}
    />
    <Box
      position="absolute"
      bottom={16}
      left={16}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mr: 2,
        padding: '6px 10px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '8px',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        zIndex: 10,
        width: 'fit-content',
        '&:hover': {
          backgroundColor: 'white',
          boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
          transform: 'translateY(-2px)',
        },
      }}
      onClick={(e) => {
        // avoid drag interception
        e.stopPropagation();
      }}
    >
      <Link
        href={singleItem.link}
        style={{
          textDecoration: 'none',
          color: 'black',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          direction: 'rtl',
        }}
      >
        {singleItem.linkTitle}
        {/* Iconify icon */}
        {/* <Iconify
                  icon="solar:arrow-right-linear"
                  style={{ fontSize: 18 }}
                  width={15}
                  height={15}
                /> */}
      </Link>
    </Box>
  </Box>
);
