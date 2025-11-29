import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

export const AboutOrder = () => {
  const mutedText = '#a8a8a8';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/assets/images/about/orvibo-timeline-graphic.png"
              alt="timeline infographic"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              مراحل ثبت سفارش مستقیم از اورویبو
            </Typography>

            <Typography variant="body2" sx={{ color: mutedText, mb: 2, lineHeight: 1.9 }}>
              فرآیند خرید مستقیم از کارخانه اورویبو به‌صورت مرحله‌به‌مرحله، شفاف و قابل پیگیری طراحی
              شده است. از لحظه ثبت سفارش تا تحویل نهایی کالا، حدود 45 روز کاری زمان لازم است و ما
              متعهد هستیم که سفارش‌ها حداکثر تا پایان این بازه به مشتری تحویل داده شوند.
            </Typography>

            <Box component="ol" sx={{ pl: 3, color: mutedText, lineHeight: 2 }}>
              <li>
                <strong>انتخاب محصولات</strong> — کاربر محصولات را انتخاب و به سبد اضافه می‌کند.
                مشخصات فنی، تصاویر و قیمت در صفحه هر محصول موجود است.
              </li>

              <li>
                <strong>مشاهده خلاصه محصولات در سبد خرید</strong> — بررسی لیست، تعداد، قیمت واحد و
                مبلغ نهایی.
              </li>

              <li>
                <strong>انتخاب خدمات نصب، گارانتی و هزینه‌های جانبی</strong> — هزینه‌ها به‌صورت شفاف
                و درصدی محاسبه می‌شوند.
              </li>

              <li>
                <strong>وارد کردن اطلاعات کامل گیرنده</strong> — نام، شماره تماس و آدرس دقیق جهت
                ارسال.
              </li>

              <li>
                <strong>انتخاب روش تحویل</strong> — روش ارسال و زمان تقریبی (حدود 45 روز کاری) نمایش
                داده می‌شود.
              </li>

              <li>
                <strong>صدور فاکتور و انتخاب روش پرداخت</strong> — تا سقف ۲۰۰ میلیون تومان آنلاین
                پرداخت، بالاتر از آن انتقال بانکی طبق روند اعلام‌شده.
              </li>

              <li>
                <strong>اعتبار فاکتور</strong> — هر فاکتور ۲۴ ساعت معتبر است؛ در صورت تأخیر ممکن است
                تغییر قیمت رخ دهد.
              </li>

              <li>
                <strong>تأمین مستقیم از کارخانه</strong> — سفارش در زنجیره رسمی تأمین ثبت و
                آماده‌سازی می‌شود.
              </li>

              <li>
                <strong>بسته‌بندی و ارسال</strong> — کالاها با بسته‌بندی اصلی و امن ارسال می‌شوند.
              </li>

              <li>
                <strong>پیگیری سفارش تا تحویل</strong> — اطلاعات رهگیری در اختیار مشتری قرار
                می‌گیرد.
              </li>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
