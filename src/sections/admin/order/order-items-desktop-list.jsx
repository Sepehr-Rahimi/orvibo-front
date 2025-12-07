import React from 'react';

import { Box, Link, Stack, Avatar, ListItemText, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { ColorPreview } from 'src/components/color-utils';
import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';

export const OrderItemsDesktopList = ({ items }) => (
  <>
    {items.map((item) => {
      const itemVariant = item.variant;
      const itemColorName = PRODUCT_COLOR_NAME_OPTIONS.find(
        (option) => option.value === itemVariant.color
      ).label;
      return (
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
                {itemVariant.model ? <Box>مدل : {itemVariant.model} </Box> : ''}
                {itemVariant?.size ? <Box> | سایز : {itemVariant.size}</Box> : ''}
                {itemVariant.kind ? <Box> | نوع : {itemVariant.kind}</Box> : ''}
                {itemVariant.color ? (
                  <Stack direction="row" spacing="5px">
                    | رنگ :
                    <ColorPreview colors={[itemVariant.color]} />
                    <Typography variant="caption">{itemColorName}</Typography>
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
      );
    })}
  </>
);
