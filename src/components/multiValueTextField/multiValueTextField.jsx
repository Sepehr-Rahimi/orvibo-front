import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Chip, TextField, Autocomplete } from '@mui/material';

const MultiValueTextField = ({ name, label, helperText, hiddenLabel, placeHolder, ...other }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          multiple
          freeSolo
          options={[]}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                label={option}
                size="small"
                color="info"
                variant="soft"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              placeholder={placeHolder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
};

export default MultiValueTextField;
