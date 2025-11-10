import { Autocomplete, TextField } from '@mui/material';

export function AddressSelector({ addresses, value, onChange }) {
  return (
    <Autocomplete
      options={addresses} // full list of addresses
      getOptionLabel={(option) => (option.title ? `${option.title} - ${option.city}` : '')}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label="انتخاب آدرس" placeholder="جستجو..." />}
      fullWidth
    />
  );
}
