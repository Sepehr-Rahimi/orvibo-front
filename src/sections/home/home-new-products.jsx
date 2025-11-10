import { Box, Grid } from '@mui/material';

import { useGetProducts } from 'src/actions/product';

import { ProductItem } from '../product/product-item';
import { ProductItemSkeleton } from '../product/product-skeleton';

const HomeNewProducts = () => {
  const { products, productsLoading } = useGetProducts({
    page: 1,
    limit: 4,
    // featured: true,
  });

  return (
    <Box>
      <Grid container spacing={{ md: 4, xs: 2 }} alignItems="stretch" justifyContent="center">
        {products.map((item) => (
          <Grid item xs={6} md={3} key={item.id} sx={{ display: 'flex' }}>
            <ProductItem product={item} />
          </Grid>
        ))}
        {productsLoading &&
          Array(6)
            .fill(null)
            .map((item, i) => (
              <Grid item xs={4} md={2} key={i} sx={{ display: 'flex' }}>
                <ProductItemSkeleton amount={1} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default HomeNewProducts;
