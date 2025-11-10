import { useRef } from 'react';

import { Box, IconButton, Card, CardMedia, CardContent, Typography, useTheme } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from './product-item';

export default function SimilarProductsCarousel({ products = [] }) {
  const scrollRef = useRef(null);
  const theme = useTheme();
  // console.log(products);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // scroll 80% of visible width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products.length) return null;

  return (
    <Box position="relative" sx={{ overflow: 'hidden', my: 3 }}>
      {/* Left Arrow */}
      <IconButton
        onClick={() => scroll('right')}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 8,
          transform: 'translateY(-50%)',
          bgcolor: 'white',
          zIndex: 2,
          boxShadow: 1,
          '&:hover': { bgcolor: theme.palette.grey[100] },
        }}
      >
        <Iconify icon="solar:double-alt-arrow-right-line-duotone" width={24} />
        {/* <ArrowBackIos fontSize="small" /> */}
      </IconButton>

      {/* Scrollable container */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
          pt: 1,
          pb: 4,
          px: 1,
        }}
      >
        {products.map((product) => (
          <ProductItem product={product} key={product?.id} sx={{ minWidth: 200, maxWidth: 200 }} />
        ))}
      </Box>

      {/* Right Arrow */}
      <IconButton
        onClick={() => scroll('left')}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 8,
          transform: 'translateY(-50%)',
          bgcolor: 'white',
          zIndex: 2,
          boxShadow: 1,
          '&:hover': { bgcolor: theme.palette.grey[100] },
        }}
      >
        <Iconify icon="solar:double-alt-arrow-left-line-duotone" width={24} />

        {/* <ArrowForwardIos fontSize="small" /> */}
      </IconButton>
    </Box>
  );
}
