'use client';

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';
import { Pagination, paginationClasses } from '@mui/material';

import { ProductItem } from './product-item';
import { ProductItemSkeleton } from './product-skeleton';

// ----------------------------------------------------------------------

export function ProductList({ products, loading, ...other }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const router = useRouter();

  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || other?.pagination?.limit;

  const renderLoading = <ProductItemSkeleton />;

  const renderList = products.map((product) => <ProductItem key={product.id} product={product} />);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderLoading : renderList}
      </Box>

      {other?.pagination?.total > limit && (
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
      )}
    </>
  );
}
