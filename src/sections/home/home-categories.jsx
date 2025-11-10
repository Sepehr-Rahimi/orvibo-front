import { Grid } from '@mui/material';

import { useGetTreeCategories } from 'src/actions/categories';

import HomeCategoryItem from './home-category-item';
import { ProductItemSkeleton } from '../product/product-skeleton';

const HomeCategories = () => {
  const { treeCategories, treeCategoriesLoading } = useGetTreeCategories();
  return (
    <Grid container spacing={{ md: 3, xs: 1 }} alignItems="stretch" justifyContent="center" mt={1}>
      {treeCategories.map((c) => (
        <Grid item xs={3} lg={2} key={c.id}>
          <HomeCategoryItem category={c} />
        </Grid>
      ))}
      {treeCategoriesLoading &&
        Array(6)
          .fill(null)
          .map((item, i) => (
            <Grid item xs={4} md={2} key={i} sx={{ display: 'flex' }}>
              <ProductItemSkeleton amount={1} />
            </Grid>
          ))}
    </Grid>
  );
};

export default HomeCategories;
