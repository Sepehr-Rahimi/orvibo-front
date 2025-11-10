import { Box, Container, Typography } from '@mui/material';

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          سیاست حریم خصوصی
        </Typography>

        <Typography variant="h6" gutterBottom>
          مقدمه:
        </Typography>
        <Typography paragraph>
          حفظ امنیت و حریم خصوصی اطلاعات شخصی کاربران برای نویان شاپ از اهمیت بالایی برخوردار است.
          این سیاست توضیح می‌دهد چه اطلاعاتی از شما جمع‌آوری می‌شود، چگونه از آن استفاده می‌کنیم و
          چطور از آن محافظت می‌نماییم.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۱. اطلاعات جمع‌آوری شده:
        </Typography>
        <Typography paragraph>
          اطلاعاتی که به صورت مستقیم توسط کاربر ثبت می‌شود مانند: نام، نام خانوادگی، شماره تلفن،
          ایمیل، آدرس، اطلاعات پرداخت و ... اطلاعات غیرمستقیم شامل: آدرس IP، نوع مرورگر، دستگاه و
          الگوی استفاده از سایت (از طریق کوکی‌ها یا ابزارهای آنالیتیک).
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۲. هدف از جمع‌آوری اطلاعات:
        </Typography>
        <Typography paragraph>
          پردازش و ارسال سفارش‌ها
          <br />
          بهبود تجربه کاربری و ارائه خدمات بهتر
          <br />
          ارتباط با کاربران جهت اطلاع‌رسانی و پشتیبانی
          <br />
          رعایت الزامات قانونی و مقررات مربوطه
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۳. افشای اطلاعات به اشخاص ثالث:
        </Typography>
        <Typography paragraph>
          نویان شاپ متعهد می‌شود اطلاعات شخصی کاربران را بدون رضایت کتبی آنان در اختیار اشخاص یا
          سازمان‌های دیگر قرار ندهد، مگر در موارد قانونی مانند ارائه اطلاعات به مراجع قضایی یا
          انتظامی با حکم رسمی.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۴. امنیت اطلاعات:
        </Typography>
        <Typography paragraph>
          از پروتکل‌های امنیتی استاندارد (مانند HTTPS و رمزنگاری اطلاعات) جهت محافظت از داده‌های
          کاربران استفاده می‌شود. دسترسی به اطلاعات کاربران محدود به کارکنانی است که مستقیماً در
          فرآیندهای مربوطه دخیل هستند.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۵. کوکی‌ها و ابزارهای تحلیلی:
        </Typography>
        <Typography paragraph>
          سایت نویان شاپ از کوکی‌ها جهت شخصی‌سازی تجربه کاربری و همچنین ابزارهای آماری مانند Google
          Analytics برای تحلیل رفتار کاربران استفاده می‌کند. کاربران می‌توانند تنظیمات کوکی مرورگر
          خود را در صورت تمایل تغییر دهند.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۶. حقوق کاربران:
        </Typography>
        <Typography paragraph>
          کاربران می‌توانند در هر زمان به اطلاعات خود دسترسی داشته و آن را ویرایش یا حذف نمایند.
          کاربران می‌توانند درخواست کنند که حساب کاربری و اطلاعاتشان به طور کامل حذف شود.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۷. به‌روزرسانی سیاست‌ها:
        </Typography>
        <Typography paragraph>
          نویان شاپ حق دارد در هر زمان سیاست حریم خصوصی را به‌روزرسانی نماید. تغییرات از طریق
          وب‌سایت به اطلاع کاربران خواهد رسید.
        </Typography>
      </Box>
    </Container>
  );
}
