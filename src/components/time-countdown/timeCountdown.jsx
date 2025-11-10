'use client';

import Countdown from 'react-countdown';
import { useState, useEffect } from 'react';

import { Box, Stack, Typography } from '@mui/material';

// Dynamically import Countdown without SSR

export default function TimeCountdown({
  date,
  showDay = true,
  showHour = true,
  showMinute = true,
  showSecond = true,
}) {
  const [mounted, setMounted] = useState(false);

  // Set the mounted state to true once the component has mounted on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, don't render the countdown to avoid hydration errors
  if (!mounted || !date) return null;

  return (
    <Countdown
      date={date}
      renderer={({ seconds, hours, minutes, days }) => (
        <Stack direction="row-reverse" spacing={{ md: 1, xs: 0.5 }} alignContent="center">
          {showDay && (
            <>
              <Typography
                sx={(theme) => ({
                  fontSize: { xs: '8px', md: '14px' },
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  borderRadius: 1,
                  padding: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                })}
                variant="subtitle2"
              >
                <Box>{days}</Box>
                <Typography
                  variant="subtitle2"
                  sx={(theme) => ({
                    fontSize: { xs: '8px', md: '14px' },
                    color: theme.palette.primary.light,
                  })}
                >
                  روز
                </Typography>
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: { xs: '8px', md: '14px' },
                }}
                variant="subtitle2"
              >
                :
              </Typography>
            </>
          )}
          {showHour && (
            <Typography
              sx={(theme) => ({
                fontSize: { xs: '8px', md: '14px' },
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                borderRadius: 1,
                padding: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              })}
              variant="subtitle2"
            >
              <Box>{hours}</Box>
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  fontSize: { xs: '8px', md: '14px' },
                  color: theme.palette.primary.light,
                })}
              >
                ساعت
              </Typography>
            </Typography>
          )}
          {showMinute && (
            <>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: { xs: '8px', md: '14px' },
                }}
                variant="subtitle2"
              >
                :
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: { xs: '8px', md: '14px' },
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  borderRadius: 1,
                  padding: 1,
                  alignItems: 'center',
                  gap: 1,
                  display: 'flex',
                })}
                variant="subtitle2"
              >
                <Box>{minutes}</Box>
                <Typography
                  variant="subtitle2"
                  sx={(theme) => ({
                    fontSize: { xs: '8px', md: '14px' },
                    color: theme.palette.primary.light,
                  })}
                >
                  دقیقه
                </Typography>
              </Typography>
            </>
          )}
          {showSecond && (
            <>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: { xs: '8px', md: '14px' },
                }}
                variant="subtitle2"
              >
                :
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: { xs: '8px', md: '14px' },
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  borderRadius: 1,
                  padding: 1,
                  alignItems: 'center',
                  gap: 1,
                  display: 'flex',
                })}
                variant="subtitle2"
              >
                <Box>{seconds}</Box>
                <Typography
                  variant="subtitle2"
                  sx={(theme) => ({
                    fontSize: { xs: '8px', md: '14px' },
                    color: theme.palette.primary.light,
                  })}
                >
                  ثانیه
                </Typography>
              </Typography>
            </>
          )}
        </Stack>
      )}
    />
  );
}
