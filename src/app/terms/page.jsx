import { Box, Container, Typography } from '@mui/material';

export default function TermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          شرایط استفاده
        </Typography>

        <Typography variant="h6" gutterBottom>
          مقدمه:
        </Typography>
        <Typography paragraph>
          با ورود به وب‌سایت نویان شاپ و استفاده از خدمات و امکانات این فروشگاه آنلاین، شما موافقت
          خود را با کلیه مفاد این شرایط اعلام می‌نمایید. لطفاً قبل از استفاده، این شرایط را به دقت
          مطالعه فرمایید.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۱. عضویت و حساب کاربری:
        </Typography>
        <Typography paragraph>
          کاربران موظف هستند اطلاعات صحیح و کامل خود را هنگام ثبت‌نام وارد نمایند. مسئولیت حفظ
          محرمانه بودن اطلاعات حساب کاربری و رمز عبور بر عهده کاربر است. نویان شاپ مسئولیتی در قبال
          خسارات ناشی از افشای اطلاعات حساب کاربری توسط کاربر یا استفاده غیرمجاز از حساب کاربر
          ندارد.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۲. حقوق مالکیت معنوی:
        </Typography>
        <Typography paragraph>
          تمامی محتواهای موجود در وب‌سایت شامل متن، تصاویر، ویدئوها، گرافیک، لوگو و سایر موارد،
          متعلق به نویان شاپ بوده و هرگونه استفاده یا کپی‌برداری بدون مجوز کتبی ممنوع است.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۳. سفارش و خرید:
        </Typography>
        <Typography paragraph>
          ثبت سفارش در نویان شاپ به منزله عقد قرارداد و پذیرش قوانین خرید آنلاین است. سفارش‌هایی که
          ناقص یا با اطلاعات نادرست ثبت شوند، توسط فروشگاه لغو خواهند شد. نویان شاپ تلاش می‌کند
          موجودی کالاها به‌روزرسانی شده باشد، اما در صورت بروز هرگونه مغایرت در موجودی یا قیمت،
          مشتری مطلع خواهد شد و سفارش قابل لغو یا اصلاح خواهد بود.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۴. بازگشت کالا:
        </Typography>
        <Typography paragraph>
          مشتری تا ۷ روز کاری پس از تحویل، مطابق با شرایط بازگشت کالا که در سایت درج شده، می‌تواند
          نسبت به عودت محصول اقدام نماید. کالا باید در شرایط اولیه و با بسته‌بندی سالم بازگردانده
          شود. جزئیات کامل در صفحه &quot;ضمانت بازگشت&quot; توضیح داده شده است.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۵. تغییرات در شرایط استفاده:
        </Typography>
        <Typography paragraph>
          نویان شاپ حق دارد در هر زمان شرایط و قوانین استفاده از وب‌سایت را به‌روزرسانی نماید.
          استفاده مستمر کاربران از سایت، به منزله پذیرش این تغییرات خواهد بود.
        </Typography>

        <Typography variant="h6" gutterBottom>
          ۶. محدودیت مسئولیت:
        </Typography>
        <Typography paragraph>
          نویان شاپ تلاش می‌کند خدمات و اطلاعات صحیح و دقیقی ارائه دهد، اما مسئولیتی در قبال خطاهای
          احتمالی، عدم دسترسی به سایت یا خسارات ناشی از استفاده نادرست از خدمات بر عهده نخواهد داشت.
        </Typography>
      </Box>
    </Container>
  );
}
