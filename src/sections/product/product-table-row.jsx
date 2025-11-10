import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fTime, fDate } from 'src/utils/format-time';
import { fCurrency, fCurrencyPrice } from 'src/utils/format-number';

import { updateProduct } from 'src/actions/product';

// ----------------------------------------------------------------------

export function RenderCellCurrencyPrice({ params }) {
  return fCurrencyPrice(params.row.currency_price);
}

export function RenderCellPrice({ params }) {
  return fCurrency(params.row.price);
}

export function RenderCellDiscountPrice({ params }) {
  return fCurrency(params.row.discount_price);
}

export function RenderCellDiscountPercentage({ params }) {
  return `${params.row.discount_percentage}%`;
}

// ----------------------------------------------------------------------

export function RenderCellPublish({ params }) {
  const isActive = useBoolean(params.row.is_published);

  return (
    <Switch
      defaultChecked={params.row.is_published}
      checked={isActive.value}
      onChange={(v) => {
        isActive.setValue(v.target.checked);

        updateProduct({ id: params.id, is_published: v.target.checked });
      }}
    />
  );
}

export function RenderCellCode({ params }) {
  return params.row.code;
}

export function RenderCellModel({ params }) {
  return params.row.model;
}

// ----------------------------------------------------------------------

export function RenderCellCreatedAt({ params }) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{fDate(params.row.createdAt)}</Box>
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {fTime(params.row.createdAt)}
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function RenderCellStock({ params }) {
  return (
    // <Stack justifyContent="center" sx={{ typography: 'caption', color: 'text.secondary' }}>
    //   <LinearProgress
    //     value={(params.row.available * 100) / params.row.quantity}
    //     variant="determinate"
    //     color={
    //       (params.row.inventoryType === 'out of stock' && 'error') ||
    //       (params.row.inventoryType === 'low stock' && 'warning') ||
    //       'success'
    //     }
    //     sx={{ mb: 1, width: 1, height: 6, maxWidth: 80 }}
    //   />
    //   {!!params.row.available && params.row.available} {params.row.inventoryType}
    // </Stack>
    params.row.stock
  );
}

// ----------------------------------------------------------------------

export function RenderCellProduct({ params, onViewRow }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Avatar
        alt={params.row.name}
        src={params.row.images[0]}
        variant="rounded"
        sx={{ width: 64, height: 64, mr: 2 }}
      />

      <ListItemText
        disableTypography
        primary={
          <Link
            noWrap
            color="inherit"
            variant="subtitle2"
            onClick={onViewRow}
            sx={{ cursor: 'pointer' }}
          >
            {params.row.name}
          </Link>
        }
        secondary={
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
              دسته بندی: {params.row.category?.name}
            </Box>
            |
            <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
              برند: {params.row.brand?.name}
            </Box>
          </Box>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}
