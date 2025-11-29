import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import { Logo } from 'src/components/logo';
import { SocialIcon } from 'src/components/iconify';

// ----------------------------------------------------------------------

// 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

const LINKS = [
  {
    headline: `با ${CONFIG.site.name}`,
    children: [
      { name: `درباره ${CONFIG.site.name}`, href: paths.about },
      { name: `ارتباط با ${CONFIG.site.name}`, href: paths.contact },
      // { name: 'باسخ به پرسش های متداول', href: paths.faqs },
    ],
  },
  {
    headline: 'حقوقی',
    children: [
      { name: 'شرایط استفاده', href: paths.terms },
      { name: 'حریم خصوصی', href: paths.privacy },
    ],
  },
  {
    headline: 'ایمیل',
    children: [
      // { name: 'info@smartnoyan.com', href: 'mailto:info@smartnoyan.com' }
      { name: 'store@smartnoyan.com', href: 'mailto:store@smartnoyan.com' },
    ],
  },
];

const enamad = (
  <Link
    href="https://trustseal.enamad.ir/?id=596519&Code=YSI7zHJipvXsIRjGk5ux7IQ4rX40wk36"
    target="_blank"
    referrerPolicy="origin"
  >
    <img
      src="https://trustseal.enamad.ir/logo.aspx?id=596519&Code=YSI7zHJipvXsIRjGk5ux7IQ4rX40wk36"
      alt="e-namad"
    />
  </Link>
);

// ----------------------------------------------------------------------

export function Footer({ layoutQuery, sx }) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      className="printOff"
      sx={{ position: 'relative', bgcolor: '#000000', color: 'white', ...sx }}
    >
      <Divider />

      <Container
        sx={{
          pb: 5,
          pt: 10,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        }}
      >
        <Logo />

        <Grid
          container
          sx={{
            mt: 3,
            justifyContent: 'center',
            gap: 1,
            [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
          }}
        >
          <Grid {...{ xs: 12, [layoutQuery]: 3 }}>
            <Typography
              component="div"
              variant="body2"
              sx={{
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              }}
            >
              <Typography typography="subtitle1" color={theme.palette.primary.light}>
                {CONFIG.site.name}
              </Typography>
              مرجع خرید تجهیزات هوشمند Orvibo با قیمت مستقیم کارخانه، تضمین اصالت کالا و ارائه خدمات
              نصب و گارانتی معتبر در سراسر ایران.
            </Typography>

            <Stack
              direction="row"
              sx={{
                mt: 3,
                mb: 5,
                justifyContent: 'center',
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
              }}
            >
              {_socials.map((social) => (
                <Link href={social.path} target="_blank">
                  <IconButton key={social.name}>
                    <SocialIcon icon={social.name} />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid {...{ xs: 12, [layoutQuery]: 6 }}>
            <Stack
              spacing={5}
              sx={{
                flexDirection: 'column',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  sx={{
                    width: 1,
                    alignItems: 'center',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
          {enamad}
        </Grid>
        <Typography variant="body2" sx={{ mt: 10 }}>
          © All rights reserved
        </Typography>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx }) {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Container>
        <Stack
          spacing={4}
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Box>
            <Logo />
            <Box sx={{ mt: 1, typography: 'caption' }}>© All rights reserved</Box>
          </Box>
          {enamad}
        </Stack>
      </Container>
    </Box>
  );
}
