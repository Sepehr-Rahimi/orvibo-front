'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { useRouter } from 'src/routes/hooks';
import { isExternalLink } from 'src/routes/utils';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';

import { trackMatomoEvent } from 'src/utils/helper';

import { varAlpha } from 'src/theme/styles';
import { searchProducts } from 'src/actions/product';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SearchNotFound } from 'src/components/search-not-found';

import { applyFilter, getAllItems } from './utils';
import ProductResultItem from './product-result-item';

// ----------------------------------------------------------------------

export function Searchbar({ data: navItems = [], sx, ...other }) {
  const theme = useTheme();

  const router = useRouter();

  const search = useBoolean();

  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState([]);

  const debouncedQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 0) {
      searchProducts({ search: debouncedQuery, page: 1, limit: 10 })
        .then((res) => {
          setData((d) => ({ ...d, products: res.data.products }));
        })
        .catch((err) => console.log(err));
      trackMatomoEvent('user-searched', { whereSearch: 'search bar', userSearch: debouncedQuery });
    } else {
      setData([]);
    }
  }, [debouncedQuery]);

  // console.log(Object.keys(data).map((group) => data[group]));

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  // const handleKeyDown = (event) => {
  //   if (event.key === 'k' && event.metaKey) {
  //     search.onToggle();
  //     setSearchQuery('');
  //   }
  // };

  // useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path) => {
      if (isExternalLink(path)) {
        window.open(path);
      } else {
        router.push(path);
      }
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const dataFiltered = applyFilter({
    inputData: getAllItems({ data: navItems }),
    query: searchQuery,
  });

  // const notFound = searchQuery && !dataFiltered.length;
  const notFound = !data || Object.keys(data).length < 1;

  // console.log(data);
  // console.log('its work');

  const renderItems = () =>
    // const dataGroups = groupItems(dataFiltered);

    Object.keys(data)
      // .sort((a, b) => -b.localeCompare(a))
      .map((group, index) => (
        <Box component="ul" key={`${group}-${index}`}>
          {data[group].map((item, i) => (
            // const { title, path } = item;

            // const partsTitle = parse(title, match(title, searchQuery));

            // const partsPath = parse(path, match(path, searchQuery));

            <Box component="li" key={`${item?.id}${i}`} sx={{ display: 'flex' }}>
              <ProductResultItem
                // path={partsPath}
                // title={partsTitle}
                // groupLabel={searchQuery && group}
                // onClickItem={() => handleClick(path)}
                product={item}
              />
            </Box>
          ))}
        </Box>
      ));
  const renderButton = (
    <Button
      onClick={() => {
        search.onTrue();
        trackMatomoEvent('nav-clicked', { navTitle: 'search bar' });
      }}
      variant="outlined" // minimal style
      color="inherit"
      sx={{
        minWidth: 0,
        padding: 1,
        borderRadius: '50%',
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
      }}
    >
      <SvgIcon sx={{ width: 24, height: 24 }}>
        <path
          fill="currentColor"
          d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
        />
      </SvgIcon>
    </Button>
    // <Box
    //   display="flex"
    //   alignItems="center"
    //   onClick={search.onTrue}
    //   sx={{
    //     // pr: { sm: 1 },
    //     // borderRadius: { xs: 1.5 },
    //     borderRadius: '50%',
    //     cursor: { sm: 'pointer' },
    //     bgcolor: { xs: varAlpha(theme.vars.palette.grey['500Channel'], 0.12) },
    //     border: '1px solid #424242',
    //     // ...sx,
    //   }}
    //   {...other}
    // >
    //   <IconButton disableRipple>
    //     <SvgIcon sx={{ width: 23, height: 23, color: '#424242' }}>
    //       <path
    //         fill="currentColor"
    //         d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
    //       />
    //     </SvgIcon>
    //     {/* <Typography>جست و جو...</Typography> */}
    //   </IconButton>

    //   {/* <Label
    //     sx={{
    //       fontSize: 12,
    //       color: 'grey.800',
    //       bgcolor: 'common.white',
    //       boxShadow: theme.customShadows.z1,
    //       display: { xs: 'none', sm: 'inline-flex' },
    //     }}
    //   >
    //     ⌘K
    //   </Label> */}
    // </Box>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        disableRestoreFocus
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
        sx={{ [`& .${dialogClasses.container}`]: { alignItems: 'flex-start' } }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="جست و جو..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={
              <Label onClick={handleClose} sx={{ letterSpacing: 1, color: 'text.secondary' }}>
                esc
              </Label>
            }
            inputProps={{ sx: { typography: 'h6' } }}
          />
        </Box>

        {notFound ? (
          <SearchNotFound query={searchQuery} sx={{ py: 15, px: 2 }} />
        ) : (
          <Scrollbar sx={{ px: 3, pb: 3, pt: 2, height: 400 }}>{renderItems()}</Scrollbar>
        )}
      </Dialog>
    </>
  );
}
