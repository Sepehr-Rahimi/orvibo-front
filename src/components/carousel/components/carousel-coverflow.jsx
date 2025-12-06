'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Box, Link } from '@mui/material';

import { calculatePercentage } from 'src/utils/helper';

import { Iconify } from 'src/components/iconify';

import { CarouselArrowProgressButtons } from '..';

const ITEM_WIDTH_PERCENTAGE = 60;
const GAP = 8;
const CLONES = 2;
const DRAGTRESHHOLD = 5;

export const CoverflowCarousel = ({ data = [] }) => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const isMove = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const [deviceWidth, setDeviceWidth] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = useMemo(() => {
    if (data.length <= CLONES) return [...data, ...data, ...data];
    return [...data.slice(-CLONES), ...data, ...data.slice(0, CLONES)];
  }, [data]);

  const totalItems = items.length;
  const originalCount = data.length;
  const sectionWidth = totalItems * (calculatePercentage(ITEM_WIDTH_PERCENTAGE, deviceWidth) + GAP);
  const singleWidth = calculatePercentage(ITEM_WIDTH_PERCENTAGE, deviceWidth) + GAP;

  // On mount: scroll to first original item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollLeft =
      (calculatePercentage(ITEM_WIDTH_PERCENTAGE, window.innerWidth) + GAP) * CLONES;
    setDeviceWidth(window.innerWidth);

    // snapToClosestItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!deviceWidth) return;
    const container = containerRef.current;
    container.scrollLeft =
      -(singleWidth * CLONES) + calculatePercentage((100 - ITEM_WIDTH_PERCENTAGE) / 2, deviceWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceWidth]);

  const snapToClosestItem = () => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = container.scrollLeft;
    const indexFloat = scroll / singleWidth;

    // Find nearest rendered index
    const nearestIndex = Math.round(indexFloat);

    const realIndex = (Math.abs(nearestIndex) - CLONES + originalCount) % originalCount;
    setCurrentIndex(realIndex);

    const targetScrollLeft =
      nearestIndex * singleWidth +
      calculatePercentage((100 - ITEM_WIDTH_PERCENTAGE) / 2, deviceWidth);

    container.style.scrollBehavior = 'smooth';
    container.scrollLeft = targetScrollLeft;

    // After scrolling completes, restore auto behavior for dragging
    setTimeout(() => {
      container.style.scrollBehavior = 'auto';
      correctInfiniteScroll(nearestIndex);
    }, 300);
  };

  // Teleport when entering clones
  const correctInfiniteScroll = (nearestIndex) => {
    const container = containerRef.current;
    if (!container) return;

    const maxIndex = originalCount + CLONES - 1;
    const minIndex = CLONES;

    const scroll = container.scrollLeft;
    // const index = scroll / singleWidth;

    if (Math.abs(nearestIndex) < minIndex) {
      // Left clones
      container.scrollLeft -= originalCount * singleWidth;
    } else if (Math.abs(nearestIndex) > maxIndex) {
      // Right clones
      container.scrollLeft += originalCount * singleWidth;
    }
  };

  const onPointerDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    // e.preventDefault();

    isDragging.current = true;
    isMove.current = false;
    startX.current = e.clientX;
    startScrollLeft.current = container.scrollLeft;

    container.style.scrollBehavior = 'auto';
  };

  const onPointerMove = (e) => {
    // e.preventDefault();
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;

    const dx = e.clientX - startX.current;

    if (Math.abs(dx) > DRAGTRESHHOLD) {
      isMove.current = true;
      e.preventDefault(); // prevent scrolling and click ONLY during drag
      container.scrollLeft = startScrollLeft.current - dx;
      container.setPointerCapture(e.pointerId);
    }
    container.scrollLeft = startScrollLeft.current - dx;
  };

  const onPointerUp = (e) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = false;
    if (isMove.current) {
      container.releasePointerCapture(e.pointerId);
      snapToClosestItem();
    }
  };

  const onClickNext = (index) => {
    const container = containerRef.current;
    const targetScrollLeft =
      -index * singleWidth + calculatePercentage((100 - ITEM_WIDTH_PERCENTAGE) / 2, deviceWidth);

    container.style.scrollBehavior = 'smooth';

    container.scrollLeft = targetScrollLeft;
  };

  const handleNext = () => {
    if (!deviceWidth) return;
    // snapToClosestItem(); // ensure alignment
    const nextIndex = (Math.abs(currentIndex) + 1) % originalCount;
    setCurrentIndex(nextIndex);
    onClickNext(nextIndex + CLONES);
  };

  const handlePrev = () => {
    if (!deviceWidth) return;

    const prevIndex = (currentIndex - 1 + originalCount) % originalCount;

    setCurrentIndex(prevIndex);
    onClickNext(prevIndex + CLONES);
  };

  return (
    <Box sx={{ position: 'relative', width: 1, height: 1, direction: 'ltr' }}>
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          gap: `${GAP}px`,
          flexDirection: 'row',
          overflowX: 'hidden',
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((singleItem, idx) => (
          <Box
            key={idx}
            sx={{
              position: 'relative',
              width: `${ITEM_WIDTH_PERCENTAGE}vw`,
              height: 500,
              flexShrink: 0,
            }}
          >
            <Image
              src={singleItem.image}
              alt="category carousel image"
              fill
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
            <Box
              position="absolute"
              bottom={16}
              right={16}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '6px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '8px',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                zIndex: 10,

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
                }}
              >
                {singleItem.linkTitle}
                {/* Iconify icon */}
                <Iconify
                  icon="solar:arrow-right-linear"
                  style={{ fontSize: 18 }}
                  width={15}
                  height={15}
                />
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
      <CarouselArrowProgressButtons
        totalSlides={originalCount}
        selectedIndex={currentIndex}
        onClickPrev={handlePrev}
        onClickNext={handleNext}
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
