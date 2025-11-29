import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

export const AboutResponsibilities = () => {
  const surface = '#121212';
  const mutedText = '#a8a8a8';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: surface }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              تعهدات فروشنده
            </Typography>
            <Box component="ul" sx={{ color: mutedText, pl: 3, lineHeight: 2 }}>
              <li>تأمین کالا مطابق مشخصات درج‌شده</li>
              <li>تحویل در بازه تعیین شده (حداکثر ۴۵ روز کاری)</li>
              <li>شفافیت در اطلاع‌رسانی وضعیت سفارش</li>
              <li>پشتیبانی تا لحظه تحویل نهایی</li>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              تعهدات خریدار
            </Typography>
            <Box component="ul" sx={{ color: mutedText, pl: 3, lineHeight: 2 }}>
              <li>ثبت اطلاعات صحیح گیرنده و آدرس</li>
              <li>پرداخت وجه در بازه اعتبار فاکتور</li>
              <li>پاسخ‌گویی در زمان هماهنگی‌های ارسال</li>
              <li>بررسی ظاهری کالا هنگام تحویل</li>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
