import React from 'react';

import { Box, Link, Stack, Avatar, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { ColorPreview } from 'src/components/color-utils';

export const OrderItemsDesktopList = ({ items }) => (
  <>
    {items.map((item) => (
      <Stack
        className="print-avoid-break"
        key={item.id}
        direction="row"
        alignItems="center"
        sx={{
          p: 3,
          minWidth: 640,
          borderBottom: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
        }}
      >
        <Avatar
          src={item?.product?.images[0]}
          variant="rounded"
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        {/* {console.log(item)} */}
        <ListItemText
          primary={
            <Link target="_blank" href={`${paths.product.details(item?.product?.slug)}`}>
              {item.product.name}
            </Link>
          }
          secondary={
            <Stack direction="row" spacing={2}>
              {item.product.model ? <Box>مدل : {item.product.model} </Box> : ''}
              {item.size ? <Box> | سایز : {item.size}</Box> : ''}
              {item.kind ? <Box> | نوع : {item.kind}</Box> : ''}
              {item.color ? (
                <Stack direction="row" spacing={2}>
                  | رنگ :
                  <ColorPreview colors={[item.color]} />
                </Stack>
              ) : (
                ''
              )}
            </Stack>
          }
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
            mt: 0.5,
          }}
        />

        <Box sx={{ typography: 'body2' }}>x{item.quantity}</Box>

        <Box sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}>
          {fCurrency(item.price)}
        </Box>
      </Stack>
    ))}
  </>
);
