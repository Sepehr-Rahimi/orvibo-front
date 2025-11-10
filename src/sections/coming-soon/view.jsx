'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ComingSoonIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export function ComingSoonView() {
  // const countdown = useCountdownDate(new Date('08/08/2025 21:30'));

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        به زودی !
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        ما در حال کار کردن روی این صفحه هستیم !
      </Typography>

      <ComingSoonIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      {/* <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="days" value={countdown.days} />
        <TimeBlock label="hours" value={countdown.hours} />
        <TimeBlock label="minutes" value={countdown.minutes} />
        <TimeBlock label="seconds" value={countdown.seconds} />
      </Stack>

      <TextField
        fullWidth
        placeholder="Enter your email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                Notify me
              </Button>
            </InputAdornment>
          ),
          sx: {
            pr: 0.5,
            [`&.${outlinedInputClasses.focused}`]: {
              boxShadow: (theme) => theme.customShadows.z20,
              transition: (theme) =>
                theme.transitions.create(['box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                }),
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                border: (theme) =>
                  `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
              },
            },
          },
        }}
        sx={{ my: 5 }}
      />

      <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton key={social.name}>
            <SocialIcon icon={social.name} />
          </IconButton>
        ))}
      </Stack> */}
    </Container>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div>
      <div> {value} </div>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
