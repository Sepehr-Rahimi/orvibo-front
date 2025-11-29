import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const MISSION_TEXT = 'تسریع روند هوشمندسازی خانه‌ها در سراسر جهان با کمک فناوری و زیبایی‌شناسی';

const DESCRIPTION = `اُرویبو (ORVIBO) از سال ۲۰۱۱، ارائه‌دهنده‌ی پیشرو در راه‌حل‌های هوشمندسازی کل خانه در سطح جهانی است. با مأموریت «تسریع روند هوشمندسازی خانه‌ها در سراسر جهان با کمک فناوری و زیبایی‌شناسی»، اُرویبو به‌صورت نوآورانه مجموعه‌ی متنوعی از محصولات هوشمند خانگی تأثیرگذار در صنعت را توسعه داده که بیش از ۱۰۰۰ پتنت (ثبت اختراع) دارند؛ از جمله: پنل‌های کنترل هوشمند، روشنایی، کلید و پریز، سیستم‌های امنیتی خانه، پرده‌های هوشمند، تهویه مطبوع هوشمند، سرگرمی خانگی و غیره.

تاکنون اُرویبو بیش از ۱۶۰۰ فروشگاه ایجاد کرده و به بیش از ۴.۵ میلیون خانوار در سراسر جهان خدمات ارائه داده است و تجربه‌ای هوشمند و زیبا از زندگی را برای کاربران به ارمغان آورده است.`;

export const AboutOrviboHero = () => (
  <Box
    bgcolor="black"
    position="relative"
    width="100%"
    height={{ xs: 700, sm: 800, md: 900, lg: 1000 }}
    overflow="hidden"
  >
    <Image
      src="/assets/images/about-orvibo/banners/firstBanner.png"
      alt="اُرویبو - هوشمندسازی خانه با فناوری و زیبایی"
      fill
      priority
      quality={95}
      style={{
        objectFit: 'contain',
        objectPosition: 'center',
      }}
    />

    <Box
      position="absolute"
      height={1}
      inset={0}
      // bgcolor="rgba(0, 0, 0, 0.52)"
      // sx={{ backdropFilter: 'blur(5px)' }}
    />

    <Container
      maxWidth="lg"
      sx={{
        top: 25,
        position: 'relative',
        height: '100%',
        textAlign: 'center',
        color: 'common.white',
        px: { xs: 3, md: 4 },
        zIndex: 1,
      }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        lineHeight={1.3}
        mb={{ xs: 3, md: 4 }}
        sx={{
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem', lg: '2rem' },
          textShadow: '2px 2px 12px rgba(0,0,0,0.7)',
        }}
      >
        {MISSION_TEXT}
      </Typography>

      <Typography
        variant="body1"
        maxWidth="1100px"
        lineHeight={1.9}
        fontSize={{ xs: '.7rem', md: '1.25rem' }}
        sx={{
          textShadow: '1px 1px 8px rgba(0,0,0,0.8)',
          opacity: 0.95,
        }}
      >
        {DESCRIPTION}
      </Typography>
    </Container>
  </Box>
);
