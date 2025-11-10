import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import ProductResultItem from 'src/layouts/components/searchbar/product-result-item';

import { Iconify } from 'src/components/iconify';
import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export function ProductSearch({ query, results, onSearch, loading }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // const [showList, setShowList] = useState(false);

  const handleClick = (name) => {
    router.push(paths.product.details(name));
  };

  const handleKeyUp = (event) => {
    // event.preventDefault();
    if (query) {
      if (event.key === 'Enter') {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('search', query);
        router.replace(`${pathName}?${newParams}`);
        // setShowList(false);
        // const selectItem = results.filter((product) => product.name === query)[0];
        // handleClick(selectItem?.name);
        // router.replace(
        //   `${pathName}?${createQueryString([
        //     ['sort', 'created_at'],
        //     ['order', 'desc'],
        //   ])}`
        // );
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 280 } }}
      loading={loading}
      freeSolo
      autoHighlight
      disableClearable
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      // getOptionLabel={(option) => option?.name}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (option && typeof option === 'object' && 'name' in option) return option.name;
        return '';
      }}
      noOptionsText={<SearchNotFound query={query} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
        paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
      }}
      inputValue={query}
      renderInput={(params) => (
        <TextField
          {...params}
          // sx={{ width: '100%' }}
          onKeyUp={handleKeyUp}
          // defaultValue={query}
          placeholder="جست و جو..."
          // onInput={() => setShowList(true)}
          // slotProps={{
          //   input: {
          //     ...params.InputProps,
          //     type: 'search',
          //   },
          // }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const matches = match(product.name, inputValue);
        const parts = parse(product.name, matches);

        return (
          <ProductResultItem showPrice={false} product={product} />

          /* // <Box component="li" {...props} onClick={() => handleClick(product.id)} key={product.id}>
          //   <Avatar
          //     key={product.id}
          //     alt={product.name}
          //     src={product.images[0]}
          //     variant="rounded"
          //     sx={{
          //       mr: 1.5,
          //       width: 48,
          //       height: 48,
          //       flexShrink: 0,
          //       borderRadius: 1,
          //     }}
          //   />

          //   <div key={inputValue}>
          //     {parts.map((part, index) => (
          //       <Typography
          //         key={index}
          //         component="span"
          //         color={part.highlight ? 'primary' : 'textPrimary'}
          //         sx={{
          //           typography: 'body2',
          //           fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
          //         }}
          //       >
          //         {part.text}
          //       </Typography>
          //     ))}
          //   </div>
          // </Box> */
        );
      }}
    />
  );
}
