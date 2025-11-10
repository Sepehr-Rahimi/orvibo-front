import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function AddressItem({ address, action, sx, ...other }) {
  return (
    <Paper
      sx={{
        gap: 2,
        display: 'flex',
        position: 'relative',
        alignItems: { md: 'flex-end' },
        flexDirection: { xs: 'column', md: 'row' },
        ...sx,
      }}
      {...other}
    >
      <Stack flexGrow={1} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle2">
            {address.full_name}
            <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
              ({address.is_home ? 'خانه' : 'محل کار'})
            </Box>
          </Typography>

          {address.is_default && (
            <Label color="info" sx={{ ml: 1 }}>
              پیشفرض
            </Label>
          )}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {address.address}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
          style={{ direction: 'ltr', textAlign: 'right' }}
        >
          {address.phone_number}
        </Typography>
      </Stack>

      {action && action}
    </Paper>
  );
}
