import React from 'react';

import { Box, Link, Stack, Avatar, ListItemText, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { ColorPreview } from 'src/components/color-utils';
import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';
import { getCurrentPrice } from 'src/utils/helper';
import { useIsPdfWithoutPricing } from './hooks/usePrintPricing';

const COLS = {
  product: 480,
  qty: 60,
  price: 110,
  total: 110,
};

export const OrderItemsDesktopList = ({ items }) => {
  const withoutPricing = useIsPdfWithoutPricing();
  const ifPdfIsWithoutPricing = `${withoutPricing && 'printOff'}`;
  const renderTableHead = (
    <>
      {' '}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: 3,
          width: 1,
          borderBottom: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
        }}
        justifyContent="space-between"
      >
        <Typography variant="body2" flex={1}>
          نام محصول
        </Typography>
        <Typography variant="body2" sx={{ width: COLS.qty }}>
          تعداد
        </Typography>
        <Typography
          variant="body2"
          className={ifPdfIsWithoutPricing}
          sx={{ width: COLS.price, textAlign: 'right' }}
        >
          قیمت واحد
        </Typography>
        <Typography
          variant="body2"
          className={ifPdfIsWithoutPricing}
          sx={{ width: COLS.total, textAlign: 'right' }}
        >
          قیمت کل
        </Typography>
      </Stack>
    </>
  );
  return (
    <>
      {renderTableHead}
      {items.map((item) => {
        const itemVariant = item.variant;
        const itemColorName = PRODUCT_COLOR_NAME_OPTIONS.find(
          (option) => option.value === itemVariant.color
        ).label;
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
                <Stack direction="column" spacing={0.2}>
                  {itemVariant.kind && (
                    <Box sx={{ typography: 'caption' }}>نوع: {itemVariant.kind}</Box>
                  )}

                  {itemVariant.color && (
                    <Stack direction="row" spacing={0.3} alignItems="center">
                      <Typography variant="caption" mr={0.5}>
                        رنگ:
                      </Typography>
                      <ColorPreview colors={[itemVariant.color]} />
                      <Typography variant="caption">{itemColorName}</Typography>
                    </Stack>
                  )}

                  {itemVariant.sku && (
                    <Box sx={{ typography: 'caption' }}>مدل: {itemVariant.sku}</Box>
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

            <Box sx={{ typography: 'body2', width: 60 }}>x{item.quantity}</Box>

            <Box
              className={ifPdfIsWithoutPricing}
              sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}
            >
              {fCurrency(getCurrentPrice(item.price, item.discount_price))}
            </Box>

            <Box
              className={ifPdfIsWithoutPricing}
              sx={{ width: 110, textAlign: 'right', typography: 'subtitle2' }}
            >
              {fCurrency(itemTotalCost)}
            </Box>
          </Stack>
        );
      })}
    </>
  );
};
