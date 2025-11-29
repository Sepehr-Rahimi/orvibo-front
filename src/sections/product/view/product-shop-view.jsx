'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

// import { trackMatomoEvent } from 'src/utils/helper';

import { PRODUCT_SORT_OPTIONS } from 'src/_mock';
import { useGetProductsAndCategory, useSearchProducts } from 'src/actions/product';

import { EmptyContent } from 'src/components/empty-content';

import { ProductList } from '../product-list';
import { ProductSort } from '../product-sort';
import { ProductSearch } from '../product-search';
import { useCheckoutContext } from '../../checkout/context';
import { ProductFiltersResult } from '../product-filters-result';

// ----------------------------------------------------------------------

export function ProductShopView({ products, categoryName }) {
  // console.log(products);
  // useEffect(() =>
  //   trackMatomoEvent('ecommerce-info', {
  //     ecommerce: {
  //       productName: categoryName,
  //       items: [
  //         {
  //           category: categoryName,s
  //         },
  //       ],
  //     },
  //   })
  // );
  // const checkout = useCheckoutContext();

  // const router = useRouter();

  // const searchParams = useSearchParams();

  // const pathName = usePathname();

  // const createQueryString = useCallback(
  //   (array) => {
  //     const newParams = new URLSearchParams(searchParams.toString());
  //     array.map(([name, value]) => {
  //       newParams.set(name, value);
  //       return null;
  //     });

  //     return newParams.toString();
  //   },
  //   [searchParams]
  // );
  // const openFilters = useBoolean();

  // const [sortBy, setSortBy] = useState('newest');

  // const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') ?? '');

  // const debouncedQuery = useDebounce(searchQuery);

  // const categoryName = decodeURIComponent(pathName.split('/')[3]);

  // console.log(categoryName);

  // useEffect(() => {
  //   // if (searchParams.get('sort') !== sortBy && searchParams.get('order')!==) {
  //   switch (sortBy) {
  //     case 'newest':
  //       router.replace(
  //         `${pathName}?${createQueryString([
  //           ['sort', 'created_at'],
  //           ['order', 'desc'],
  //         ])}`
  //       );

  //       break;
  //     case 'priceAsc':
  //       router.replace(
  //         `${pathName}?${createQueryString([
  //           ['sort', 'price'],
  //           ['order', 'asc'],
  //         ])}`
  //       );

  //       break;
  //     case 'priceDesc':
  //       router.replace(
  //         `${pathName}?${createQueryString([
  //           ['sort', 'price'],
  //           ['order', 'desc'],
  //         ])}`
  //       );

  //       break;

  //     default:
  //       // router.replace(`${pathName}?${searchParams.toString()}`);
  //       break;
  //   }
  //   // }
  // }, [createQueryString, pathName, router, searchParams, sortBy]);

  // const filters = useSetState({
  //   // gender: [],
  //   // colors: [],
  //   // rating: '',
  //   category: 'همه',
  //   priceRange: [0, 0],
  // });

  // const { searchResults, searchLoading } = useSearchProducts({
  //   params: {
  //     sort: searchParams.get('sort'),
  //     order: searchParams.get('order'),
  //     // category:searchParams.get('category'),
  //     category_name: categoryName,
  //     search: debouncedQuery,
  //   },
  // });

  // const { treeCategories } = useGetTreeCategories();

  // const dataFiltered = applyFilter({ inputData: products, filters: filters.state, sortBy });

  // const canReset =
  //   // filters.state.gender.length > 0 ||
  //   // filters.state.colors.length > 0 ||
  //   // filters.state.rating !== '' ||
  //   filters.state.category !== 'همه' ||
  //   filters.state.priceRange[0] !== 0 ||
  //   filters.state.priceRange[1] !== 0;

  const notFound = !products?.length;

  // const handleSortBy = useCallback((newValue) => {
  //   setSortBy(newValue);
  // }, []);

  // const handleSearch = useCallback((inputValue) => {
  //   setSearchQuery(inputValue);
  // }, []);

  const productsEmpty = !products?.length;

  // const renderFilters = (
  //   <Stack
  //     spacing={3}
  //     justifyContent="space-between"
  //     alignItems={{ xs: 'flex-end', sm: 'center' }}
  //     direction={{ xs: 'column', sm: 'row' }}
  //   >
  //     <ProductSearch
  //       query={searchQuery}
  //       results={searchResults}
  //       onSearch={handleSearch}
  //       loading={searchLoading}
  //     />

  //     <Stack direction="row" spacing={1} flexShrink={0}>
  //       {/* <ProductFilters
  //         filters={filters}
  //         canReset={canReset}
  //         open={openFilters.value}
  //         onOpen={openFilters.onTrue}
  //         onClose={openFilters.onFalse}
  //         options={{
  //           // colors: PRODUCT_COLOR_OPTIONS,
  //           // ratings: PRODUCT_RATING_OPTIONS,
  //           // genders: PRODUCT_GENDER_OPTIONS,
  //           categories: [{ label: 'همه' }, ...treeCategories],
  //         }}
  //       /> */}

  //       <ProductSort sort={sortBy} onSort={handleSortBy} sortOptions={PRODUCT_SORT_OPTIONS} />
  //     </Stack>
  //   </Stack>
  // );

  // const renderResults = <ProductFiltersResult filters={filters} totalResults={products.length} />;

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;

  return (
    <Container sx={{ mb: 15 }}>
      {/* <CartIcon totalItems={checkout.totalItems} /> */}

      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        {categoryName ? `محصولات ${decodeURIComponent(categoryName)}` : `ایران ارویبو`}
      </Typography>

      {/* <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}

        {canReset && renderResults}
      </Stack> */}

      {(notFound || productsEmpty) && renderNotFound}

      <ProductList data={products} withCategory={!categoryName} />
      {/* {true && (
        <Stack alignItems="center" sx={{ mt: 8, mb: { xs: 10, md: 15 } }}>
          <Button
            size="large"
            variant="outlined"
            startIcon={
              <Iconify
                icon={false ? 'svg-spinners:12-dots-scale-rotate' : 'solar:alt-arrow-down-outline'}
                width={24}
              />
            }
          >
            بیشتر
          </Button>
        </Stack>
      )} */}
    </Container>
  );
}

// function applyFilter({ inputData, filters, sortBy }) {
//   const { category, priceRange } = filters;

//   const min = priceRange[0];

//   const max = priceRange[1];

//   const createQueryString = useCallback(
//     (name, value) => {
//       const newParams = new URLSearchParams(searchParams.toString());
//       newParams.set(name, value);

//       return newParams.toString();
//     },
//     [searchParams]
//   );

//   // Sort by
//   if (sortBy === 'featured') {
//     inputData = orderBy(inputData, ['totalSold'], ['desc']);
//   }

//   if (sortBy === 'newest') {
//     inputData = orderBy(inputData, ['createdAt'], ['desc']);
//   }

//   if (sortBy === 'priceDesc') {
//     inputData = orderBy(inputData, ['price'], ['desc']);
//   }

//   if (sortBy === 'priceAsc') {
//     inputData = orderBy(inputData, ['price'], ['asc']);
//   }

//   // filters
//   // if (gender.length) {
//   //   inputData = inputData.filter((product) => product.gender.some((i) => gender.includes(i)));
//   // }

//   if (category !== 'همه') {
//     inputData = inputData.filter((product) => product.category.name === category);
//   }

//   // if (colors.length) {
//   //   inputData = inputData.filter((product) =>
//   //     product.colors.some((color) => colors.includes(color))
//   //   );
//   // }

//   if (min !== 0 || max !== 0) {
//     inputData = inputData.filter((product) => product.price >= min && product.price <= max);
//   }

//   // if (rating) {
//   //   inputData = inputData.filter((product) => {
//   //     const convertRating = (value) => {
//   //       if (value === 'up4Star') return 4;
//   //       if (value === 'up3Star') return 3;
//   //       if (value === 'up2Star') return 2;
//   //       return 1;
//   //     };
//   //     return product.totalRatings > convertRating(rating);
//   //   });
//   // }

//   return inputData;
// }
