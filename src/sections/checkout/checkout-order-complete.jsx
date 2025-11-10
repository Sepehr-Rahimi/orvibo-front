import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { OrderCompleteIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CheckoutOrderComplete({ open, onReset, onDownloadPDF }) {
  return (
    <Dialog
      fullWidth
      fullScreen
      open={open}
      PaperProps={{
        sx: {
          width: { md: `calc(100% - 48px)` },
          height: { md: `calc(100% - 48px)` },
        },
      }}
    >
      <Box
        gap={5}
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{
          py: 5,
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">از خرید شما متشکریم</Typography>

        <OrderCompleteIllustration />

        <Typography>
          سفارش شما ثبت شد
          <br />
          <br />
          {/* <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link> */}
          <br />
          <br />
          با شما ظرف 48 ساعت کاری تماس گرفته میشود.
          <br /> اگر سؤالی دارید، با ما تماس بگیرید. <br />
          سپاس
        </Typography>

        <Divider sx={{ width: 1, borderStyle: 'dashed' }} />

        <Box gap={2} display="flex" flexWrap="wrap" justifyContent="center">
          <Button
            size="large"
            color="inherit"
            variant="outlined"
            onClick={onReset}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            ادامه خرید
          </Button>
          <Button
            size="large"
            color="inherit"
            variant="contained"
            href="/"
            onClick={onReset}
            startIcon={<Iconify icon="solar:home-2-outline" />}
          >
            خانه
          </Button>

          {/* <Button
            size="large"
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-download-fill" />}
            onClick={onDownloadPDF}
          >
            دانلود فایل PDF
          </Button> */}
        </Box>
      </Box>
    </Dialog>
  );
}
