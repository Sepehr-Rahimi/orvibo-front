import React from 'react';

import { Box, Link, Stack, Avatar, ListItemText, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { ColorPreview } from 'src/components/color-utils';
import { PRODUCT_COLOR_NAME_OPTIONS_EN } from 'src/_mock';
import { getCurrentPrice } from 'src/utils/helper';
import { useIsPdfWithoutPricing } from './hooks/usePrintPricing';

const COLS = {
  product: 480,
  qty: 110,
  price: 110,
  total: 110,
};

export const OrderItemsDesktopListEn = ({ items }) => {
  const withoutPricing = useIsPdfWithoutPricing();
  const ifPdfIsWithoutPricing = `${withoutPricing && 'printOff'}`;
  const renderTableHead = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 3,
        width: 1,
        borderBottom: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
      }}
    >
      <Typography variant="body2" flex={1}>
        Product Name
      </Typography>

      <Typography variant="body2" sx={{ width: COLS.qty, textAlign: 'center' }}>
        Qty
      </Typography>

      <Typography
        variant="body2"
        className={ifPdfIsWithoutPricing}
        sx={{ width: COLS.price, textAlign: 'right' }}
      >
        Unit Price
      </Typography>

      <Typography
        variant="body2"
        className={ifPdfIsWithoutPricing}
        sx={{ width: COLS.total, textAlign: 'right' }}
      >
        Total Price
      </Typography>
    </Stack>
  );

  return (
    <>
      {renderTableHead}

      {items.map((item) => {
        const itemVariant = item.variant;
        const itemColorName = PRODUCT_COLOR_NAME_OPTIONS_EN.find(
          (option) => option.value === itemVariant.color
        )?.label;

        const itemTotalCost = getCurrentPrice(item.price, item.discount_price) * item.quantity;

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
              overflowX: 'auto',
            }}
          >
            <Avatar
              src={item?.product?.images[0]}
              variant="rounded"
              sx={{ width: 48, height: 48, ml: 2 }}
            />

            <ListItemText
              primary={
                <Link target="_blank" href={paths.product.details(item?.product?.slug)}>
                  {item.product.name}
                </Link>
              }
              secondary={
                <Stack direction="column" spacing={0.2}>
                  {itemVariant.kind && (
                    <Box sx={{ typography: 'caption' }}>Type: {itemVariant.kind}</Box>
                  )}

                  {itemVariant.color && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="caption">Color:</Typography>
                      <ColorPreview colors={[itemVariant.color]} />
                      <Typography variant="caption" mr={0.5}>
                        {itemColorName}
                      </Typography>
                    </Stack>
                  )}

                  {itemVariant.sku && (
                    <Box sx={{ typography: 'caption' }}>Model: {itemVariant.sku}</Box>
                  )}
                </Stack>
              }
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
                mt: 0.5,
              }}
              sx={{ flex: 1 }}
            />

            <Box sx={{ typography: 'body2', width: COLS.qty, textAlign: 'center' }}>
              x{item.quantity}
            </Box>

            <Box
              className={ifPdfIsWithoutPricing}
              sx={{ width: COLS.price, textAlign: 'right', typography: 'subtitle2' }}
            >
              {fCurrency(getCurrentPrice(item.price, item.discount_price))}
            </Box>

            <Box
              className={ifPdfIsWithoutPricing}
              sx={{ width: COLS.total, textAlign: 'right', typography: 'subtitle2' }}
            >
              {fCurrency(itemTotalCost)}
            </Box>
          </Stack>
        );
      })}
    </>
  );
};
