import React, { useEffect, useState } from 'react';

import { Box, Checkbox, FormControlLabel, Stack } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';
import { calculatePercentage } from 'src/utils/helper';

export const CheckoutCartServiceOptions = ({ checkout }) => {
  const [options, setOptions] = useState({
    services: calculatePercentage(15, checkout.subtotal),
    guarantee: calculatePercentage(5, checkout.subtotal),
  });
  useEffect(() => {
    setOptions({
      services: calculatePercentage(15, checkout.subtotal),
      guarantee: calculatePercentage(5, checkout.subtotal),
    });
  }, [checkout.subtotal]);
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={checkout.services > 0}
              onChange={(e) => {
                if (e.target.checked) checkout.onAddService(options.services);
                else checkout.onAddService(0);
              }}
            />
          }
          label="خدمات نصب و راه اندازی :"
        />
        <span>{fCurrency(options.services)}</span>
      </Stack>
      <Stack direction="row" alignItems="center">
        <FormControlLabel
          checked={checkout.guarantee > 0}
          control={
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) checkout.onAddGuarantee(options.guarantee);
                else checkout.onAddGuarantee(0);
              }}
            />
          }
          label="گارانتی تجهیزات :"
        />
        <span>{fCurrency(options.guarantee)}</span>
      </Stack>
    </Box>
  );
};
