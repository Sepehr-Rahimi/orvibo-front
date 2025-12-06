import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useGetCategories } from 'src/actions/categories';

import { CoverflowCarousel } from 'src/components/carousel/components/carousel-coverflow';

export const HomeCarouselCategory = () => {
  const [data, setData] = useState([]);

  const { Categories, CategoriesLoading } = useGetCategories();

  useEffect(
    () =>
      Categories &&
      setData(
        Categories?.map((singleCategory) => ({
          image: singleCategory.image_url,
          link: paths.product.byCategory(singleCategory.name),
          linkTitle: singleCategory.name,
        }))
      ),
    [Categories, CategoriesLoading]
  );

  return <Box>{data.length && <CoverflowCarousel data={data} />}</Box>;
};
