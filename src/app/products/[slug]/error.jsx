'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

// ----------------------------------------------------------------------

export default function Error({ error, reset }) {
  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      <EmptyContent
        filled
        title="محصول پیدا نشد"
        action={
          <Button
            component={RouterLink}
            href={paths.product.root}
            startIcon={<Iconify width={16} icon="eva:arrow-ios-forward-fill" />}
            sx={{ mt: 3 }}
          >
            برگشت به لیست
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );
}
