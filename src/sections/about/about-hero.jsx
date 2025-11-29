import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function AboutHero() {
  const mutedText = '#a8a8a8';

  return (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(rgba(11,11,11,0.7), rgba(11,11,11,0.7)), url(/images/orvibo-hero-grayscale.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box position="relative" width={1}>
        <Image
          ratio={{ xs: '4/3', sm: '16/9', md: '5/2' }}
          src="/assets/images/about/direct-order-hero.webp"
          alt="direct order"
        />

        {/* Animated overlay box */}
        <m.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ position: 'relative' }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0,0,0,.55)',
              bottom: { xs: 8, sm: 14, md: 20 },
              left: { xs: 8, sm: 14, md: 20 },
              py: { xs: 2, sm: 3, md: 5 },
              px: { xs: 2, sm: 3, md: 4 },
              width: { xs: '90%', sm: '70%', md: 600 },
              position: 'absolute',
            }}
          >
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ width: '100%' }}
            >
              <m.div variants={fadeInUp}>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    color: '#ffffff',
                    mb: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' },
                  }}
                >
                  سفارش مستقیم به اورویبو
                </Typography>
              </m.div>

              <m.div variants={fadeInUp}>
                <Typography
                  variant="body1"
                  sx={{
                    color: mutedText,
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
                    lineHeight: 1.7,
                  }}
                >
                  اورویبو (Orvibo) یک شرکت پیشرو در زمینه طراحی و تولید محصولات هوشمند (IoT) است که
                  با ترکیب تکنولوژی و زیبایی چشم‌اندازی برای زندگی مدرن هوشمند رقم زده است.
                </Typography>
              </m.div>

              <m.div variants={fadeInUp}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      bgcolor: '#e6e6e6',
                      color: '#000',
                      width: { xs: '100%', sm: 'auto' },
                    }}
                    href="/products"
                  >
                    مشاهده محصولات قابل سفارش
                  </Button>
                </Stack>
              </m.div>
            </m.div>
          </Box>
        </m.div>
      </Box>
    </Box>
  );
}
