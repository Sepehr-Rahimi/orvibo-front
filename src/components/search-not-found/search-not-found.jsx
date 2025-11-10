import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function SearchNotFound({ query, sx, ...other }) {
  // console.log(query);
  if (!query || query === '') {
    return (
      <Typography variant="body2" sx={sx}>
        لطفا کلمه مورد نظر را جست و جو کنید
      </Typography>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
      <Box sx={{ mb: 1, typography: 'h6' }}>نتیجه ای یافت نشد</Box>

      <Typography variant="body2">
        نتیجه ای برای&nbsp;
        <strong>{`"${query}"`}</strong>
        یافت نشد .
        <br /> کلمه مورد نظر را بررسی کنید
      </Typography>
    </Box>
  );
}
