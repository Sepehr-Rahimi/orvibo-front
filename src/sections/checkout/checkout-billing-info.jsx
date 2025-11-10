import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CheckoutBillingInfo({ billing, onBackStep }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="آدرس"
        action={
          <Button size="small" startIcon={<Iconify icon="solar:pen-bold" />} onClick={onBackStep}>
            ویرایش
          </Button>
        }
      />
      <Stack spacing={1} sx={{ p: 3 }}>
        <Box sx={{ typography: 'subtitle2' }}>
          {`${billing?.full_name} `}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            ({billing?.is_home ? 'خانه' : 'محل کار'})
          </Box>
        </Box>

        <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{billing?.address}</Box>

        <Box
          sx={{
            color: 'text.secondary',
            typography: 'body2',
            direction: 'rtl',
            textAlign: 'left',
          }}
        >
          {billing?.phone_number}
        </Box>
      </Stack>
    </Card>
  );
}
