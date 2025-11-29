import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

export const AboutShipping = () => {
  const mutedText = '#a8a8a8';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {/* پیشنهاد عکس: پک اصلی Orvibo یا بسته‌بندی با لوگو */}
            <Box
              component="img"
              src="/assets/images/about/delivery.jpg"
              alt="Packaging"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              شرایط ارسال، بیمه، تحویل سالم
            </Typography>

            <Typography variant="body1" sx={{ color: mutedText, lineHeight: 1.9 }}>
              مدت زمان تأمین و تحویل کالا: با توجه به تأمین مستقیم از کارخانه، بازه ثبت سفارش تا
              تحویل نهایی حدود ۴۵ روز کاری است. ما متعهد هستیم که تمامی سفارش‌ها حداکثر تا ۴۵ روز
              کاری تحویل شوند و در صورت تأخیر غیرمتعارف، مشتری به‌صورت شفاف مطلع خواهد شد.
            </Typography>

            <Box component="ul" sx={{ color: mutedText, pl: 3, mt: 2, lineHeight: 2 }}>
              <li>روش ارسال: حمل هوایی یا ترکیبی (بسته به نوع کالا و مقصد)</li>
              <li>مقصد تحویل: مطابق آدرس اعلامی مشتری؛ مسئولیت صحت آدرس با مشتری است</li>
              <li>
                تحویل سالم: بسته‌بندی اصلی کارخانه و بیمه حمل؛ در صورت آسیب باید در محل تحویل ثبت و
                تحویل بدون صورت‌جلسه انجام نشود.
              </li>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
