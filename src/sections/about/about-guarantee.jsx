import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

export const AboutGuarantee = () => {
  const mutedText = '#a8a8a8';
  const accent = '#e6e6e6';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              شرایط گارانتی محصولات اورویبو
            </Typography>

            <Typography variant="body2" sx={{ color: mutedText, lineHeight: 1.9, mb: 2 }}>
              دریافت گارانتی فقط در صورتی امکان‌پذیر است که نصب و راه‌اندازی تجهیزات توسط تیم سرویس
              360 انجام شده باشد. در صورت عدم استفاده از این خدمات، گارانتی فعال نخواهد شد.
            </Typography>

            <Accordion sx={{ bgcolor: '#0f0f0f', color: (theme) => theme.palette.grey[300] }}>
              <AccordionSummary>شرایط شمول گارانتی</AccordionSummary>
              <AccordionDetails sx={{ color: mutedText }}>
                گارانتی شامل ایرادات فنی ناشی از تولید، نقص قطعات داخلی و مشکلات نرم‌افزاری مرتبط با
                عملکرد اصلی دستگاه در شرایط استفاده استاندارد می‌باشد.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ bgcolor: '#0f0f0f', color: (theme) => theme.palette.grey[300] }}>
              <AccordionSummary>موارد خارج از شمول</AccordionSummary>
              <AccordionDetails sx={{ color: mutedText }}>
                نوسانات برق، نصب غیراستاندارد، ضربه، آب‌خوردگی، دستکاری سخت‌افزاری توسط افراد
                غیرمجاز و حوادث غیرمترقبه شامل گارانتی نیستند.
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ bgcolor: '#0f0f0f', color: (theme) => theme.palette.grey[300] }}>
              <AccordionSummary>فرآیند استفاده از گارانتی</AccordionSummary>
              <AccordionDetails sx={{ color: mutedText }}>
                ثبت درخواست از طریق پنل کاربری یا تماس با پشتیبانی؛ بررسی فنی توسط کارشناسان و انجام
                تعمیر یا تعویض در صورت نیاز.
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/about/guarranty.png"
              alt="Product warranty"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
