import { Box, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';

export const AboutService = () => {
  const mutedText = '#a8a8a8';
  const surface = '#121212';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: surface }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              خدمات نصب و راه‌اندازی تجهیزات هوشمند (سرویس 360)
            </Typography>

            <Typography variant="body1" sx={{ color: mutedText, lineHeight: 1.9, mb: 2 }}>
              در صورت انتخاب این گزینه، کلیه خدمات نصب و راه‌اندازی توسط تیم تخصصی «سرویس 360» انجام
              می‌شود. تیم متشکل از نیروهای فنی آموزش‌دیده در حوزه برق، شبکه و سیستم‌های هوشمند است و
              نصب مطابق با استانداردهای اورویبو انجام خواهد شد.
            </Typography>

            <Box component="ul" sx={{ color: mutedText, pl: 3, lineHeight: 2 }}>
              <li>بررسی زیرساخت پروژه پیش از نصب</li>
              <li>نصب اصولی و استاندارد تجهیزات</li>
              <li>راه‌اندازی نرم‌افزاری و تنظیمات سیستم</li>
              <li>تست کامل عملکرد پس از نصب</li>
              <li>آموزش کار با سیستم به کارفرما</li>
            </Box>

            <Typography variant="body2" sx={{ color: mutedText, mt: 2 }}>
              هزینه خدمات نصب: معادل <strong>۹٪</strong> مبلغ تجهیزات هوشمند می‌باشد که در صورت
              انتخاب به‌صورت خودکار به فاکتور اضافه می‌شود.
            </Typography>

            <Box mt={3}>
              <Link href="/service-360" sx={{ color: '#e6e6e6' }}>
                مشاهده توضیحات کامل سرویس 360
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* پیشنهاد عکس: تکنسین نصب یا ست‌آپ اتاق هوشمند با تبلت */}
            <Box
              component="img"
              src="/assets/images/about/service360.jfif"
              alt="Service 360 technician"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
