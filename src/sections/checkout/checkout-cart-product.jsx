import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';
// import { trackMatomoEvent } from 'src/utils/helper';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { IncrementerButton } from '../product/components/incrementer-button';

// ----------------------------------------------------------------------

export function CheckoutCartProduct({ row, onDelete, onDecrease, onIncrease }) {
  return (
    <TableRow>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar
            variant="rounded"
            alt={row.name}
            src={row.coverUrl}
            sx={{ width: 64, height: 64 }}
          />

          <Stack spacing={0.5}>
            <Link href={`${paths.product.details(row?.slug)}`}>
              <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }} color="black">
                {row.name}
              </Typography>
            </Link>

            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'body2', color: 'text.secondary' }}
            >
              {row.size && (
                <>
                  سایز: <Label sx={{ ml: 0.5 }}> {row.size} </Label>
                  <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
                </>
              )}
              <ColorPreview colors={[row.color]} />
            </Stack>
          </Stack>
        </Stack>
      </TableCell>

      {/* <TableCell>{row.kinds || '-'}</TableCell> */}

      <TableCell>
        {/* {fCurrency(row.price)} */}

        <Box component="span">{fCurrency(row.current_price)}</Box>
      </TableCell>

      <TableCell>
        <Box sx={{ width: 88, textAlign: 'right' }}>
          <IncrementerButton
            quantity={row.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={row.quantity <= 1}
            disabledIncrease={row.quantity >= row.stock}
          />

          <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
            موجود: {row.stock}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(row.current_price * row.quantity)}</TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton
          onClick={() => {
            // trackMatomoEvent('delete-from-cart', { productName: row.name, productId: row.id });
            onDelete();
          }}
          className="delete-from-cart"
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
