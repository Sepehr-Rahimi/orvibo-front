import { useGetBlogs } from 'src/actions/blog';

import { PostItemLatest } from '../blog/post-item';
import { ProductItemSkeleton } from '../product/product-skeleton';

const { Box, Grid, Card, CardMedia, CardContent, Typography, Button } = require('@mui/material');

const HomeNewBlogs = () => {
  const { blogs, blogsLoading } = useGetBlogs();

  return (
    <Box>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center">
        {blogs.map((item) => (
          <Grid item xs={6} md={3} key={item.id} sx={{ display: 'flex' }}>
            <PostItemLatest post={item} />
          </Grid>
        ))}
        {blogsLoading &&
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

export default HomeNewBlogs;
