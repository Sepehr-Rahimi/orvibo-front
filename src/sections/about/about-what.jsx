import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { fPercent } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutWhat() {
  const theme = useTheme();

  const mutedText = '#a8a8a8';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          چرا خرید مستقیم از کارخانه اورویبو؟
        </Typography>

        <Typography variant="body1" sx={{ color: mutedText, mb: 2, lineHeight: 1.9 }}>
          خرید مستقیم از کارخانه به این معناست که محصول بدون عبور از زنجیره طولانی واسطه‌ها، با قیمت
          واقعی و اصالت تضمین‌شده به دست شما می‌رسد. در این مدل خرید، هزینه‌هایی مثل سود چندمرحله‌ای
          فروشندگان، انبارداری‌های متعدد و افزایش‌های غیرشفاف قیمت حذف می‌شود و نتیجه آن، قیمت
          منصفانه‌تر و اطمینان بالاتر از کیفیت کالا است.
        </Typography>

        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
            مهم‌ترین مزایای خرید مستقیم:
          </Typography>

          <Box component="ol" sx={{ pl: 3, color: mutedText, lineHeight: 2 }}>
            <li>
              <strong>قیمت واقعی و شفاف</strong> — تمام محصولات با قیمت نزدیک به قیمت اصلی کارخانه
              عرضه می‌شوند؛ بدون هزینه پنهان یا افزایش غیرمنطقی.
            </li>
            <li>
              <strong>اصالت ۱۰۰٪ کالا</strong> — محصول مستقیماً از زنجیره رسمی تأمین اورویبو تهیه
              می‌شود و احتمال دریافت کالای غیراصلی حذف می‌گردد.
            </li>
            <li>
              <strong>دسترسی به جدیدترین محصولات</strong> — محدود به موجودی انبارهای داخلی نیستید و
              به مدل‌ها و نسخه‌های به‌روز دسترسی دارید.
            </li>
            <li>
              <strong>تنوع کامل بدون محدودیت</strong> — کلیه دسته‌بندی‌ها از کلید تا سنسورها قابل
              سفارش هستند.
            </li>
            <li>
              <strong>مناسب برای مصرف‌کننده و همکاران</strong> — هم برای خریدار نهایی مقرون‌به‌صرفه
              و هم برای پیمانکاران و نصاب‌ها مفید است.
            </li>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
