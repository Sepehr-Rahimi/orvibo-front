import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';

import { formatStr } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function RHFDatePicker({ name, slotProps, persian, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={persian ? AdapterDateFnsJalali : undefined}>
          <DatePicker
            {...field}
            value={new Date(field.value)}
            onChange={(newValue) =>
              field.onChange(dayjs(newValue).set('h', 0).set('minute', 0).format())
            }
            // format={formatStr.split.date}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message ?? slotProps?.textField?.helperText,
                ...slotProps?.textField,
              },

              ...slotProps,
            }}
            {...other}
          />
        </LocalizationProvider>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFMobileDateTimePicker({ name, slotProps, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileDateTimePicker
          {...field}
          value={dayjs(field.value)}
          onChange={(newValue) => field.onChange(dayjs(newValue).format())}
          format={formatStr.split.dateTime}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
