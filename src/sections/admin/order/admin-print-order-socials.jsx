import React from 'react';

import { Box, Link, Stack, Typography } from '@mui/material';

const socials = [
  {
    title: 'Tel',
    path: 'tel:02126152998',
    path2: 'tel:09362172533',
    name: '021-26152998',
    name2: '09362172533',
  },
  { title: 'Website', path: 'https://www.iranorvibo.com', name: 'iranorvibo.com' },
  {
    title: 'Instagram',
    path: 'https://www.instagram.com/iranorvibo',
    name: 'iranorvibo',
  },
];
export const AdminPrintOrderSocials = () => (
  <Stack direction="row" sx={{ direction: 'rtl' }} justifyContent="space-between" width="100%">
    {socials.map((item) => (
      <Stack direction="row">
        <Typography>{item.title} : </Typography>
        <Link href={item.path} target="_blank">
          {item.name}
        </Link>
        {item.name2 && (
          <Link href={item.path2} target="_blank">
            -{item.name2}
          </Link>
        )}
      </Stack>
    ))}
  </Stack>
);
