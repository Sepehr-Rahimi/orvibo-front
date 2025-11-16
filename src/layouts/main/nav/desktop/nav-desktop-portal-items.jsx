import React from 'react';

import { Box, Link, Stack, useTheme, keyframes, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Image } from 'src/components/image';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NavDesktopPortalItems = ({ items = [] }) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 3, pb: 2 }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={3}
        alignItems="flex-start"
        sx={{
          rowGap: 4,
          columnGap: 4,
          justifyContent: 'flex-start',
        }}
      >
        {items.map((item, index) => (
          <Link href={`${paths.product.details(item?.slug)}`}>
            <Box
              key={item.name}
              sx={{
                width: 150,
                cursor: 'pointer',
                opacity: 0,
                animation: `${fadeInUp} 0.6s ease forwards`,
                animationDelay: `${index * 120}ms`,
                transition: theme.transitions.create(['transform', 'opacity'], {
                  duration: 180,
                  easing: theme.transitions.easing.easeInOut,
                }),
                '&:hover': {
                  transform: 'translateY(-4px)',
                  opacity: 0.9,
                },
              }}
            >
              {/* Product Image */}
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  // borderRadius: 1.5,
                  overflow: 'hidden',
                  mb: 1,
                  // boxShadow: theme.shadows[1],
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

              {/* Product Name */}
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
  );
};
