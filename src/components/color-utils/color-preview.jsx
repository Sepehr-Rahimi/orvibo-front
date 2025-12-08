import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export const ColorPreview = forwardRef(({ colors, limit = 3, sx, ...other }, ref) => {
  const colorsRange = colors.slice(0, limit);

  const restColors = colors.length - limit;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...sx,
      }}
      {...other}
    >
      {colorsRange.map((color, index) => (
        <Box
          key={color + index}
          sx={{
            ml: { md: -0.75, xs: -0.5 },
            width: { md: 16, xs: 14 },
            height: { md: 16, xs: 14 },
            backgroundColor: color,
            borderRadius: '50%',
            border: (theme) => ({
              md: `solid 2px ${theme.vars.palette.background.paper}`,
              xs: `solid 1.5px ${theme.vars.palette.background.paper}`,
            }),
            boxShadow: (theme) =>
              `inset -1px 1px 2px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
          }}
        />
      ))}

      {colors.length > limit && (
        <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${restColors}`}</Box>
      )}
    </Box>
  );
});
