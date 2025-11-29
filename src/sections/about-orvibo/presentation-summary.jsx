import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Image } from 'src/components/image';

const sections = [
  {
    image: '/assets/images/about-orvibo/banners/sec3.png',
    title: 'پرشور و متعهد',
    secondTitle: 'نوآوری ناب',
    text: 'ما عاشق کارمان هستیم و با اشتیاق بی‌پایان، نوآوری را تشویق می‌کنیم، خود را مدام بهبود می‌دهیم و گام‌به‌گام به کمال نزدیک می‌شویم؛ این‌گونه است که کارایی عملیاتی و تولیدی شرکت را به‌طور مداوم ارتقا می‌دهیم.اُرویبو طی بیش از یک دهه، با همین اشتیاق سوزان و اراده‌ی خستگی‌ناپذیر تلاش کرده تا تجربه‌ی انسان‌ها از فضاهای زندگی را بهتر و بهتر کند و در نهایت به آرزوی بزرگ خود برسد: خلق واقعی‌ترین و کامل‌ترین هوش خانگی برای کل خانه.',
  },
  {
    image: '/assets/images/about-orvibo/banners/sec3_2.png',
    title: 'کاوش مداوم ',
    secondTitle: 'جست‌وجوی حقیقت در عمل',
    text: 'ما بی‌وقفه کاوش می‌کنیم، نوآوری می‌کنیم، روی زمین محکم می‌ایستیم و همیشه به دنبال حقیقت و عمل‌گرایی هستیم.اُرویبو همچنان در خط مقدم فناوری AIoT و حوزه‌ی هوشمندسازی پیش می‌تازد و مرزهای جدید را کشف می‌کند. ما به حقیقت‌جویی پایبندیم و افتخارمان این است که تجربه‌ای دلپذیر، کارآمد و باکیفیتِ بالا از زندگی را برای کاربرانمان خلق کنیم.',
  },
  {
    image: '/assets/images/about-orvibo/banners/sec3_3.png',
    title: 'کاربران در اولویت',
    secondTitle: 'بر پایه‌ی روحیه‌ی تلاش و پیشرفت',
    text: 'ما متعهد هستیم ارزشی کاملاً کاربرمحور خلق کنیم؛ به کاربران نزدیک‌تر شویم، نیازهایشان را عمیقاً درک کنیم، به آن‌ها پاسخ دهیم و حتی فراتر از انتظارشان عمل کنیم. موفقیت نتیجه‌ی تلاش سخت و مداوم است. هر موفقیتی که شرکت به دست آورده، حاصل استقامت و زحمت تک‌تک همکارانی است که روحیه‌ی تلاش و پیشرفت را در خود دارند. ما به دنبال معمولی بودن نیستیم؛ ما عدالت، تعالی و برتری را دنبال می‌کنیم.',
  },
];

export const PresentationSummary = () => (
  <Stack px={4} my={2} mx={3} gap={4}>
    {sections.map((item, index) => (
      <Stack
        justifyContent="space-between"
        flexDirection={{ xs: 'column', md: +index % 2 === 0 ? 'row' : 'row-reverse' }}
        gap={{ xs: 0, md: 3 }}
        height={{ md: 530 }}
      >
        <Box flex={3}>
          <Box position="relative" width={1}>
            <Image src={item.image} alt={item.title} ratio="5/3" />
          </Box>
        </Box>
        <Box flex={2} px={4}>
          <Box my={{ md: 4, xs: 2 }}>
            <Typography component="h2" variant="h3" fontWeight={500}>
              {item.title}
            </Typography>
            <Typography component="h2" variant="h3" fontWeight={500}>
              {item.secondTitle}
            </Typography>
          </Box>
          <Typography variant="body1">{item.text}</Typography>
        </Box>
      </Stack>
    ))}
  </Stack>
);
