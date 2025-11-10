import { toast } from 'sonner';
import React, { useEffect, useCallback } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

import { Box, Button, Container } from '@mui/material';

import { useCountdownSeconds } from 'src/hooks/use-countdown';

import { sendVerificationCode } from 'src/auth/context/jwt';

export const AccountConfirmDialogContent = ({ phone, setCode, code }) => {
  const { seconds: countdown, start: startCountdown } = useCountdownSeconds();

  const sentVerifyCode = useCallback(async () => {
    try {
      await sendVerificationCode({ phone_or_email: phone });
      startCountdown(300);
      toast.success('کد احراز ارسال شد');
    } catch (error) {
      if (error?.remaining_time) {
        startCountdown(error?.remaining_time);
      }
    }
  }, [phone, startCountdown]);

  useEffect(() => {
    sentVerifyCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box>
        {/* <Field.Code name="code" /> */}
        <MuiOtpInput onChange={(v) => setCode(v)} value={code} dir="ltr" length={6} gap={1.5} />
        <Button
          disabled={countdown > 0}
          onClick={() => {
            sentVerifyCode();
          }}
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ my: 3 }}
        >
          ارسال دوباره کد {countdown ? `(ثانیه : ${countdown})` : ''}
        </Button>
      </Box>
    </Container>
  );
};
