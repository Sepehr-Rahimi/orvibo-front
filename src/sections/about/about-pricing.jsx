import { Box, Container, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

export const AboutPricing = () => {
  const surface = '#121212';
  const mutedText = '#a8a8a8';
  const accent = '#e6e6e6';

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: surface }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          سود بازرگانی، هزینه نصب، هزینه گارانتی
        </Typography>

        <Table sx={{ color: mutedText }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: accent }}>خدمات نصب</TableCell>
              <TableCell sx={{ color: mutedText }}>۹٪</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: accent }}>گارانتی</TableCell>
              <TableCell sx={{ color: mutedText }}>۵٪</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: accent }}>سود بازرگانی</TableCell>
              <TableCell sx={{ color: mutedText }}>۱۰٪</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
};
