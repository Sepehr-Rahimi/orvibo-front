import React from 'react';

import { Box, Stack, Typography, useTheme, alpha } from '@mui/material';

import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';

import { ColorOption } from '../settings/drawer/nav-options';

export const VariantPickup = ({ setChoosedVariant, choosedVariant, variants }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // console.log(variants);

  const colorName = (variantColor) =>
    PRODUCT_COLOR_NAME_OPTIONS.find((option) => option.value === variantColor).label;

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {variants.map((variant) => {
        const isActive = choosedVariant?.id === variant.id;

        return (
          <Box
            key={variant.id}
            onClick={() => setChoosedVariant(variant)}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              borderRadius: 2,
              px: 1.5,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              transition: 'all 0.2s ease',
              bgcolor: isActive
                ? alpha(theme.palette.secondary.main, 0.15)
                : alpha(theme.palette.common.white, 0.04),
              border: `1px solid ${
                isActive ? theme.palette.secondary.main : alpha(theme.palette.grey[500], 0.3)
              }`,
              '&:hover': {
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                borderColor: theme.palette.secondary.main,
              },
            }}
          >
            {/* Color Circle */}
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: variant.color,
                boxShadow: `0 0 4px ${alpha(theme.palette.common.white, 0.2)}`,
                border: `1px solid ${isDark ? theme.palette.grey[800] : theme.palette.grey[300]}`,
              }}
            />
            <Typography>{colorName(variant.color)}</Typography>
            {/* Label (if any) */}
            {variant.kind && (
              <Typography
                variant="body2"
                sx={{
                  color: isActive ? theme.palette.secondary.main : theme.palette.text.primary,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                - {variant.kind}
              </Typography>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};
