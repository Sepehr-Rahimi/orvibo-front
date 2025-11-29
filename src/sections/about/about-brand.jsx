import { Box, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';

export const AboutBrand = () => {
  const mutedText = '#a8a8a8';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              اورویبو
            </Typography>
            <Typography variant="body1" sx={{ color: mutedText, lineHeight: 1.9 }}>
              مأموریت این شرکت «شتاب‌دادن به فرآیند تکنولوژیک-مسکونی جهانی با فناوری و زیبایی» است؛
              یعنی اورویبو نه‌تنها به توسعه تکنولوژی فکر می‌کند، بلکه می‌خواهد این تکنولوژی به شکلی
              زیبا و هماهنگ با زندگی انسان‌ها در خانه‌های مدرن درآید.
            </Typography>

            <Box mt={2}>
              <Link href="/about-orvibo" underline="hover" sx={{ color: mutedText }}>
                برای اطلاعات بیشتر صفحه درباره اورویبو را مطالعه کنید
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            {/* پیشنهاد: عکس HQ Orvibo یا محصول نمادین روی بک‌گراند سفید یا مینیمال */}
            <Box
              component="img"
              src="/assets/images/about/orvibo-hq.jpg"
              alt="Orvibo HQ or product"
              sx={{
                width: '100%',
                borderRadius: 2,
                display: 'block',
                mx: 'auto',
                boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
