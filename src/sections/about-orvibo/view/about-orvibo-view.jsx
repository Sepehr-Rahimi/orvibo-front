import { Box } from '@mui/material';
import React from 'react';
import { AboutOrviboHero } from '../about-orvibo-hero';
import { AboutOrviboPresentation } from '../about-orvibo-presentation';

export const AboutOrviboView = () => {
  const i = 0;
  return (
    <Box minHeight="100vh">
      <AboutOrviboHero />
      <AboutOrviboPresentation />
    </Box>
  );
};
