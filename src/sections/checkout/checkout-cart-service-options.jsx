import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

import { fCurrency } from 'src/utils/format-number';
import { calculatePercentage } from 'src/utils/helper';
import { toast } from 'sonner';

export const CheckoutCartServiceOptions = ({ checkout }) => {
  const servicePercent = 9;
  const guaranteePercent = 5;

  const [options, setOptions] = useState({
    services: calculatePercentage(servicePercent, checkout.subtotal),
    guarantee: calculatePercentage(guaranteePercent, checkout.subtotal),
  });

  useEffect(() => {
    setOptions({
      services: calculatePercentage(servicePercent, checkout.subtotal),
      guarantee: calculatePercentage(guaranteePercent, checkout.subtotal),
    });

    if (checkout.services > 0) {
      checkout.onUpdateField('services', calculatePercentage(servicePercent, checkout.subtotal));
    }

    if (checkout.guarantee > 0) {
      checkout.onUpdateField('guarantee', calculatePercentage(guaranteePercent, checkout.subtotal));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout?.subtotal]);

  const handleServiceChange = (checked) => {
    checkout.onUpdateField('services', checked ? options.services : 0);
    if (!checked) checkout.onUpdateField('guarantee', 0);
  };

  const handleGuaranteeChange = (checked) => {
    if (!checkout.services) {
      toast.error(
        'گارانتی فقط در صورت انجام نصب و راه اندازی توسط تیم ما فعال میشود. لطفا ابتدا گزینه نصب و راه اندازی را انتخاب نمایید.'
      );
      return;
    }
    checkout.onUpdateField('guarantee', checked ? options.guarantee : 0);
  };

  return (
    <Card sx={{ bgcolor: 'background.paper' }}>
      <CardContent sx={{ pb: '8px !important' }}>
        {/* Services */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel
            label="خدمات نصب و راه اندازی"
            control={
              <Checkbox
                checked={checkout.services > 0}
                onChange={(e) => handleServiceChange(e.target.checked)}
              />
            }
          />
          <Typography variant="body2" color="text.secondary">
            {fCurrency(options.services)}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        {/* Guarantee */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel
            label="گارانتی تجهیزات"
            control={
              <Checkbox
                checked={checkout.guarantee > 0 && !!checkout.services}
                onChange={(e) => handleGuaranteeChange(e.target.checked)}
              />
            }
          />
          <Typography variant="body2" color="text.secondary">
            {fCurrency(options.guarantee)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
