import React from 'react';

import { Select, MenuItem, OutlinedInput } from '@mui/material';

export const OrderStatusSelect = ({
  options,
  selectedStatus,
  menuItemDisabled,
  selectDisabled,
  handleStatusChange,
}) => (
  <Select
    // labelId="demo-simple-select-label"
    // value={statusFields.payment_status}
    disabled={selectDisabled || false}
    size="small"
    value={selectedStatus.value}
    label="order_status"
    onChange={(event) => handleStatusChange(event, 'payment_status')}
    sx={{ ...selectedStatus.theme, border: selectedStatus.theme.color }}
    inputProps={{ 'aria-label': 'Without label' }}
    input={<OutlinedInput />}
  >
    {/* <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem> */}
    {options.map((option) => (
      <MenuItem disabled={menuItemDisabled?.(option) || false} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);
