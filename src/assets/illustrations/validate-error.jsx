import { memo } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';

import { BackgroundShape } from './background-shape';

export function PaymentFailedIllustration({ hideBackground, sx, ...other }) {
  const theme = useTheme();

  const ERROR_LIGHT = theme.vars.palette.error.light;
  const ERROR_DARK = theme.vars.palette.error.dark;

  return (
    <Box
      position="relative"
      sx={{ width: 320, maxWidth: 1, flexShrink: 0, height: 'auto', ...sx }}
      {...other}
    >
      <Box
        component="svg"
        width="100%"
        height="100%"
        viewBox="0 0 480 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!hideBackground && <BackgroundShape />}

        <image
          href={`${CONFIG.site.basePath}/assets/illustrations/characters/character-7.webp`}
          height="300"
          x="205"
          y="30"
        />

        <path
          fill="#FF5630"
          d="M111.1 141.2c58.7-1 58.6-88.3 0-89.2-58.6 1-58.6 88.3 0 89.2z"
          opacity="0.12"
        />
        <path fill="#FFAC82" d="M111.1 120c30.8-.5 30.8-46.3 0-46.8-30.8.5-30.8 46.3 0 46.8z" />
        <defs>
          <linearGradient
            id="paint0_linear_error"
            x1="78.3"
            x2="78.3"
            y1="187.77"
            y2="305.935"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={ERROR_LIGHT} />
            <stop offset="1" stopColor={ERROR_DARK} />
          </linearGradient>
        </defs>
      </Box>
    </Box>
  );
}

export default memo(PaymentFailedIllustration);
