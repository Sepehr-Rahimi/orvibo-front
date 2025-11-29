'use client';

import React from 'react';

// import ExpandMoreIcon from '@mui/';
import { Box, Divider } from '@mui/material';
import { AboutHero } from '../about-hero';
import { AboutBrand } from '../about-brand';
import { AboutWhat } from '../about-what';
import { AboutOrder } from '../about-order';
import { AboutService } from '../about-service';
import { AboutGuarantee } from '../about-guarantee';
import { AboutPricing } from '../about-pricing';
import { AboutShipping } from '../about-shipping';
import { AboutResponsibilities } from '../about-responsibilities';

const sectionBg = '#0b0b0b';
const accent = '#e6e6e6';

export function DirectOrderPage() {
  return (
    <Box sx={{ bgcolor: sectionBg, color: accent, minHeight: '100vh' }} dir="rtl">
      <AboutHero />

      <AboutBrand />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      {/* WHY DIRECT - benefits with numbered list in text form */}
      <AboutWhat />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      {/* ORDER STEPS (timeline list) */}
      <AboutOrder />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      {/* INSTALLATION SERVICE (Service 360) */}
      <AboutService />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />
      <AboutGuarantee />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      <AboutPricing />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      {/* SHIPPING */}
      <AboutShipping />

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      <AboutResponsibilities />
      {/* RESPONSIBILITIES */}

      <Divider sx={{ borderColor: '#222', opacity: 0.7 }} />

      {/* FINAL CTA */}
    </Box>
  );
}
