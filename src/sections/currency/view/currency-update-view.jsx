'use client';

import React from 'react';

import { Card } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CurrencyUpdateForm } from './currrency-update-form';

export const CurrencyUpdateView = () => (
  <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <CustomBreadcrumbs
      heading="آپدیت قیمت"
      links={[{ name: 'داشبورد', href: paths.adminDashboard.root }, { name: 'آپدیت قیمت ها' }]}
      sx={{ mb: { xs: 3, md: 5 } }}
    />

    <Card
      sx={{
        px: 4,
        py: 2,
      }}
    >
      <CurrencyUpdateForm />
    </Card>
  </DashboardContent>
);
