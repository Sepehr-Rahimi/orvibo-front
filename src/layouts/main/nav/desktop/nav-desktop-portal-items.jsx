import React, { useRef, useState, useEffect } from 'react';

import { Box, Link, Stack, IconButton, useTheme, keyframes, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export const NavDesktopPortalItems = ({ items = [] }) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  // Detect overflow
  useEffect(() => {
    const el = containerRef.current;
    if (el) setShowArrows(el.scrollWidth > el.clientWidth);
  }, [items]);

  const scroll = (direction) => {
    const el = containerRef.current;
    if (!el) return;
    const amount = 300;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ mt: 3, pb: 2, position: 'relative' }}>
      {/* Left Arrow */}
      {showArrows && (
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
      )}

      {/* Slider Container */}
      <Box
        ref={containerRef}
        sx={{
          overflowX: 'auto',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
          scrollBehavior: 'smooth',
          px: 1,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Stack direction="row" spacing={3}>
          {items.map((item, index) => (
            <Link href={`${paths.product.details(item?.slug)}`} key={item.name}>
              <Box
                sx={{
                  width: 150,
                  display: 'inline-block',
                  cursor: 'pointer',
                  opacity: 0,
                  animation: `${fadeInUp} 0.6s ease forwards`,
                  animationDelay: `${index * 120}ms`,
                  transition: theme.transitions.create(['transform', 'opacity'], {
                    duration: 180,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  '&:hover': { transform: 'translateY(-4px)', opacity: 0.9 },
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    overflow: 'hidden',
                    mb: 1,
                    bgcolor: theme.palette.background.default,
                  }}
                >
                  <Image
                    ratio="1/1"
                    src={item.images?.[0] || '/assets/placeholder.png'}
                    alt={item.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    textAlign: 'center',
                    color: theme.palette.grey[900],
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Link>
          ))}
        </Stack>
      </Box>

      {/* Right Arrow */}
      {showArrows && (
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
      )}
    </Box>
  );
};
