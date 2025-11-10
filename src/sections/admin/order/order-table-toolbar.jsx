import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import { useCallback, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';
import { Select, MenuItem, InputLabel, FormControl, formHelperTextClasses } from '@mui/material';

import { ORDER_PAYMENT_STATUS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

dayjs.extend(jalaliday);

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const popover = usePopover();

  // const defaultEnd = dayjs();
  // const defaultStart = dayjs().subtract(1, 'month');

  const now = new Date();
  const defaultEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  // const defaultEndDate = new Date(2025, 9, 14, 0, 0, 0);
  const defaultStartDate = new Date(new Date().setDate(defaultEndDate.getDate() - 30));

  useEffect(() => {
    filters.setState({ startDate: defaultStartDate, endDate: defaultEndDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      // console.log(newValue);
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      {/* <DatePicker
        label="از تاریخ"
        value={filters.state.startDate}
        onChange={handleFilterStartDate}
        slotProps={{ textField: { fullWidth: true } }}
        sx={{ maxWidth: { md: 200 } }}
      /> */}

      {/* <DatePicker
        label="تا تاریخ"
        value={filters.state.endDate}
        onChange={handleFilterEndDate}
        slotProps={{
          textField: {
            fullWidth: true,
            error: dateError,
            helperText: dateError ? 'End date must be later than start date' : null,
          },
        }}
        sx={{
          maxWidth: { md: 200 },
          [`& .${formHelperTextClasses.root}`]: {
            position: { md: 'absolute' },
            bottom: { md: -40 },
          },
        }}
      /> */}

      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          label="از تاریخ"
          value={filters.state.startDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ maxWidth: { md: 200 } }}
        />

        <DatePicker
          label="تا تاریخ"
          value={filters.state.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? 'تاریخ پایان زود تر از شروع است' : null,
            },
          }}
          sx={{
            maxWidth: { md: 200 },
            [`& .${formHelperTextClasses.root}`]: {
              position: { md: 'absolute' },
              bottom: { md: -40 },
            },
          }}
        />
      </LocalizationProvider>

      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          fullWidth
          size="medium"
          value={filters.state.name}
          onChange={handleFilterName}
          placeholder="جست و جو..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        {/* <Button sx={{ width: 150, height: 54 }} onClick={popover.onOpen} variant="outlined">
            {ORDER_PAYMENT_STATUS.map(
              (option) => option.value === filters.state.paymentStatus && option.label
            ) ?? 'وضعیت پرداخت'}
          </Button> */}

        <FormControl sx={{ width: 170 }} variant="filled">
          <InputLabel>وضعیت پرداخت</InputLabel>

          <Select
            value={filters.state.paymentStatus}
            fullWidth
            slotProps={{ arrow: { placement: 'right-top' } }}
            onChange={(event) => {
              onResetPage();
              filters.setState({ paymentStatus: event.target.value });
            }}
          >
            {ORDER_PAYMENT_STATUS.map((option) => (
              <MenuItem value={option.value} sx={{ ...option.theme }}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="">همه</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
