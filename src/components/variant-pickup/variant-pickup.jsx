import { toast } from 'sonner';
import React, { useState } from 'react';

import { Box, Stack, Typography, useTheme, alpha } from '@mui/material';

import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';

export const VariantPickup = ({ setChoosedVariant, choosedVariant, variants }) => {
  // console.log(variants);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const colors = Array.from(new Set(variants.map((singleVariant) => singleVariant.color)));
  const [activeColor, setActiveColor] = useState(colors[0]);

  const kinds = variants
    .filter((singleVariant) => singleVariant.color === activeColor)
    .filter((singleVariant) => singleVariant?.kind?.trim()?.length > 0)
    .map((singleVariant) => singleVariant.kind);

  const hasKind = kinds.length > 0;

  console.log(hasKind);

  // console.log(variants);

  const colorName = (variantColor) =>
    PRODUCT_COLOR_NAME_OPTIONS.find((option) => option.value === variantColor).label;

  const handleChooseVariant = ({ color, kind }) => {
    const sameColorVariants = variants.filter((v) => v.color === color);

    if (sameColorVariants.length === 0) {
      toast.error('محصولی با این رنگ موجود نیست');
      return;
    }

    const hasKinds = sameColorVariants.some((v) => v.kind);

    let targetVariant;

    if (hasKinds && kind) {
      targetVariant = sameColorVariants.find((v) => v.kind === kind);
    } else {
      targetVariant = sameColorVariants[0];
    }

    if (!targetVariant) {
      toast.error('محصول با این ترکیب رنگ و نوع موجود نیست');
      return;
    }

    setChoosedVariant(targetVariant);
  };

  const variantBoxStyle = (isActive) => ({
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
  });

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {colors.map((singleColor) => {
        const isActive = singleColor === activeColor;

        return (
          <Box
            key={singleColor}
            onClick={() => {
              setActiveColor(singleColor);
              handleChooseVariant({ color: singleColor });
            }}
            sx={{
              ...variantBoxStyle(isActive),
            }}
          >
            {/* Color Circle */}
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: singleColor,
                boxShadow: `0 0 4px ${alpha(theme.palette.common.white, 0.2)}`,
                border: `1px solid ${isDark ? theme.palette.grey[800] : theme.palette.grey[300]}`,
              }}
            />
            <Typography>{colorName(singleColor)}</Typography>
            {/* Label (if any) */}
          </Box>
        );
      })}
      {hasKind &&
        kinds.map((singleKind) => {
          const isActive = choosedVariant.kind === singleKind;
          console.log(singleKind);

          return (
            <Box
              key={singleKind}
              onClick={() => handleChooseVariant({ color: activeColor, kind: singleKind })}
              sx={{ ...variantBoxStyle(isActive) }}
            >
              <Typography variant="body1">{singleKind}</Typography>
            </Box>
          );
        })}
    </Stack>
  );
};
