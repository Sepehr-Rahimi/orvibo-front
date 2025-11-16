import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { varHover, AnimateAvatar } from 'src/components/animate';
import { Button } from '@mui/material';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function AccountButton({ open, photoURL, displayName, sx, ...other }) {
  const theme = useTheme();

  // const renderFallback = (
  //   <Avatar
  //     sx={{
  //       width: 40,
  //       height: 40,
  //       border: `solid 2px ${theme.vars.palette.background.default}`,
  //     }}
  //   >
  //     <SvgIcon>
  //       <circle cx="12" cy="6" r="4" fill="currentColor" />
  //       <path
  //         fill="currentColor"
  //         d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
  //         opacity="0.5"
  //       />
  //     </SvgIcon>
  //   </Avatar>
  // );

  return (
    <Button
      href={`${paths.dashboard.root}`}
      variant="outlined" // minimal style
      color="inherit"
      sx={{
        minWidth: 0,
        padding: 1,
        borderRadius: '50%',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
        ...sx,
      }}
      {...other}
    >
      {/* <NoSsr>
        <AnimateAvatar
          sx={{ bgColor: 'transparent' }}
          slotProps={{
            avatar: {
              src: photoURL,
              alt: displayName,
              sx: { bgcolor: 'transparent', color: 'white' },
            },
            // overlay: {
            //   border: 1,
            //   spacing: 2,
            //   color: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
            // },
          }}
        > */}
      <Iconify width={24} height={24} icon="solar:user-rounded-bold" />
      {/* {displayName?.charAt(0).toUpperCase()} */}
      {/* </AnimateAvatar>
      </NoSsr> */}
    </Button>
  );
}
