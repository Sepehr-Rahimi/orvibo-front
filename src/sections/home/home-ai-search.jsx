import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  Stack,
  Button,
  useTheme,
  InputBase,
  keyframes,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// Define gradient animation
export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled component
const BorderWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: '4px', // Controls the thickness of the border
  borderRadius: '10px',
  background: 'linear-gradient(200deg, #d300eb, #8d00eb, #2a0236)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 4s ease infinite`,
  [theme.breakpoints.down('md')]: {
    padding: '3.5px',
  },
}));

// Input styled to sit inside the animated border
const AnimatedInput = styled(InputBase)(({ theme }) => ({
  border: 'none',
  outline: 'none',
  width: '100%',
  padding: '12px 16px',
  borderRadius: '7px',
  backgroundColor: 'white',
  backdropFilter: 'blur(2px)', // Optional glass-like feel
  fontSize: '2rem',
  '&::placeholder': {
    color: '#aaaaaa',
  },
  [theme.breakpoints.up('md')]: {
    padding: '16px 8px 16px 12px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    padding: '5px 4px',
  },
}));

const AnimateButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(270deg, #d300eb, #8d00eb, #2a0236)',
  backgroundSize: '600% 600%',
  color: '#fff',
  fontWeight: 'bold',
  padding: '12px 16px',
  borderRadius: '6px',
  textTransform: 'none',
  animation: `${gradientAnimation} 5s ease infinite`,
  border: 'none',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    padding: '6px 6px',
  },
}));

export const AiSearchInput = ({ ...params }) => {
  const [input, setInput] = useState(params.defaultValue ?? '');

  const router = useRouter();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSend = () => {
    setInput('');
    if (input.trim().length > 0) router.push(`${paths.recommendProducts}?search=${input}`);
  };

  return (
    <Stack
      my={{ xs: 0, md: 1 }}
      gap={2}
      direction={isMobile ? 'column' : 'row'}
      justifyItems="center"
    >
      <BorderWrapper sx={{ flex: isMobile ? 'unset' : 4 }}>
        <AnimatedInput
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="solar:cpu-outline" width={24} sx={{ color: 'black' }} />
            </InputAdornment>
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="جست و جو با هوش مصنوعی"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <AnimateButton onClick={handleSend}>
                <Iconify icon="solar:plain-broken" width={23} sx={{ color: 'white' }} />
              </AnimateButton>
            </InputAdornment>
          }
        />
      </BorderWrapper>
    </Stack>
  );
};
