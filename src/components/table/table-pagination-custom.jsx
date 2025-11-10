import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

export function TablePaginationCustom({
  sx,
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  ...other
}) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {/* <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        labelRowsPerPage="ردیف در هر صفحه"
        labelDisplayedRows={({ count, from, to, page }) =>
          `ردیف ${from} تا ${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`
        }
        sx={{ borderTopColor: 'transparent' }}
      />

      {onChangeDense && (
        <FormControlLabel
          label="Dense"
          control={<Switch name="dense" checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: { sm: 'absolute' },
          }}
        />
      )} */}
    </Box>
  );
}
