import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';

export const AboutFinal = () => {
  const mutedText = '#a8a8a8';

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Container maxWidth="md">
        {/* پیشنهاد تصویر پس‌زمینه: خانه هوشمند لوکس در شب با نور ملایم */}
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          آماده ثبت سفارش؟
        </Typography>

        <Typography variant="body1" sx={{ color: mutedText, mb: 4 }}>
          در این صفحه کلیه مراحل، هزینه‌ها و شرایط خرید مستقیم تجهیزات اوریبو به‌صورت شفاف اعلام شده
          است. برای ثبت سفارش و دریافت پیش‌فاکتور اقدام کنید.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" sx={{ bgcolor: '#e6e6e6', color: '#000' }}>
            شروع ثبت سفارش
          </Button>
          <Button variant="outlined" sx={{ borderColor: mutedText, color: mutedText }}>
            تماس با پشتیبانی
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
