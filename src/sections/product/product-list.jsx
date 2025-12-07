'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import { Pagination, paginationClasses, Typography } from '@mui/material';

import { ProductItem } from './product-item';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

export function ProductList({ data, withCategory = true }) {
  const searchParams = useSearchParams();

  // console.log(withCategory);

  const renderWithCategory = data.map((singleData) => (
    <>
      <Typography variant="h4" my={3} color="black">
        {singleData?.categoryName}
      </Typography>
      <Box
        mb={4}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        // {...other}
      >
        {singleData?.products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </>
  ));

  const renderWithoutCategory = (
    <Box
      mb={4}
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      // {...other}
    >
      {data?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Box>
  );

  // const limit = searchParams.get('limit') || other?.pagination?.limit;

  // const renderLoading = <ProductItemSkeleton />;

  // const renderList = data.map((singleData) => (
  //   <>
  //     <Typography>{singleData.categoryName}</Typography>
  //     {singleData.products.map((product) => (
  //       <ProductItem key={product.id} product={product} />
  //     ))}
  //   </>
  // ));

  // const createQueryString = useCallback(
  //   (name, value) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  return (
    <>
      {withCategory ? renderWithCategory : renderWithoutCategory}
      {/* {other?.pagination?.total > limit && (
        <Pagination
          count={Math.ceil(other.pagination.total / limit)}
          page={+page}
          onChange={(_, newPage) => {
            router.push(`${pathname}?${createQueryString('page', newPage)}`);
          }}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )} */}
    </>
  );
}
