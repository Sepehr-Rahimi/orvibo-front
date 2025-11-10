import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

import { Box, Grid } from '@mui/material';

import { useGetProducts } from 'src/actions/product';

import { ProductItem } from '../product/product-item';
import { ProductItemSkeleton } from '../product/product-skeleton';

const MotionGridItem = m(Grid);

const HomeHotDeals = ({ products, productsLoading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // Trigger slightly before entering view

  const throwVariants = {
    hidden: {
      opacity: 0,
      y: 150, // all start from below
      x: 0,
      rotate: 20,
      scale: 0.9,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 10,
        delay: i * 0.3, // throw one by one
      },
    }),
  };
  return (
    <Box ref={ref}>
      <Grid
        container
        spacing={{ md: 4, xs: 2 }}
        alignItems="stretch"
        justifyContent="center"
        sx={{ overflow: 'visible' }}
      >
        {products.map((item, i) => (
          // <Grid item xs={6} md={3} key={item.id} sx={{ display: 'flex' }}>
          <MotionGridItem
            item
            xs={6}
            md={3}
            key={item.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
            custom={i}
            variants={throwVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            // whileHover={{
            //   scale: 1.05,
            //   rotate: i % 2 === 0 ? 3 : -3,
            //   transition: { type: 'spring', stiffness: 300 },
            // }}
          >
            <ProductItem product={item} />
          </MotionGridItem>
        ))}
        {productsLoading &&
          Array(4)
            .fill(null)
            .map((item, i) => (
              // <Grid item xs={4} md={2} key={i} sx={{ display: 'flex' }}>
              <MotionGridItem
                item
                xs={6}
                md={3}
                key={i}
                sx={{ display: 'flex' }}
                custom={i}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <ProductItemSkeleton amount={1} />
              </MotionGridItem>
            ))}
      </Grid>
    </Box>
  );
};

export default HomeHotDeals;
