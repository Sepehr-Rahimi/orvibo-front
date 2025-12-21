'use client';

import { Suspense, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

// import { trackMatomoEvent } from 'src/utils/helper';

import { varAlpha } from 'src/theme/styles';
import { useGetParentCategories } from 'src/actions/categories';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CartIcon } from '../components/cart-icon';
import { ProductSimilar } from '../product-similar';
import { useCheckoutContext } from '../../checkout/context';
import { ProductDetailsReview } from '../product-details-review';
import { ProductDetailsSummary } from '../product-details-summary';
import { ProductDetailsCarousel } from '../product-details-carousel';
import { ProductDetailsDescription } from '../product-details-description';

// ----------------------------------------------------------------------

// const SUMMARY = [
//   {
//     title: '۱۰۰٪ اورجینال',
//     description: 'شکلات بار، آب‌نبات عصایی، بستنی، تافی و کوکی حلوا.',
//     icon: 'solar:verified-check-bold',
//   },
//   {
//     title: 'تعویض ۱۰ روزه',
//     description: 'بیسکویت مارشمالو، دونات، دراژه، کیک میوه‌ای و ویفر.',
//     icon: 'solar:clock-circle-bold',
//   },
//   {
//     title: 'گارانتی یک ساله',
//     description: 'پشمک، کیک زنجبیلی، من عاشق شکر و شیرینی هستم.',
//     icon: 'solar:shield-check-bold',
//   },
// ];

// ----------------------------------------------------------------------

export function ProductShopDetailsView({ product, similarProducts }) {
  const checkout = useCheckoutContext();

  const { Categories: parentCategories } = useGetParentCategories(product?.category_id || '');

  // const { products, productsLoading, productsError, productsEmpty } = useGetProducts();

  // const similarProducts =
  //   productsLoading || productsEmpty || productsError
  //     ? []
  //     : products.filter((prod) => prod?.id !== product?.id);

  // console.log(products);
  // console.log(similarProducts);

  const tabs = useTabs('description');

  // useEffect(() => {
  // Send custom event to Matomo Tag Manager
  // if (window._mtm) {
  //   // console.log(window._mtm);
  //   window._mtm.push({
  //     event: 'product-view',
  //     productName: product.name,
  //     productId: product.id,
  //   });
  // }
  // trackMatomoEvent('ecommerce-info', {
  //   productName: product.name,
  //   ecommerce: {
  //     items: [
  //       {
  //         sku: product.id,
  //         name: product.name,
  //         price: product.price,
  //         category: parentCategories[0],
  //       },
  //     ],
  //   },
  // });
  // }, [product, parentCategories]);

  return (
    <Container sx={{ mt: 5, mb: 10 }}>
      {/* <CartIcon totalItems={checkout.totalItems} /> */}

      <CustomBreadcrumbs
        links={[
          { name: 'خانه', href: '/' },
          { name: 'فروشگاه', href: paths.product.root },
          ...parentCategories.map((p) => ({
            name: p.name,
            href: paths.product.byCategory(p?.name),
          })),

          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        {/* <Button className="test-button">test click</Button> */}
        <Grid xs={12} md={6} lg={7}>
          <Suspense fallback={<Box>loading...</Box>}>
            <ProductDetailsCarousel images={product?.images} />
          </Suspense>
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          {product && (
            <ProductDetailsSummary
              product={product}
              items={checkout.items}
              onAddCart={checkout.onAddToCart}
              onGotoStep={checkout.onGotoStep}
              onDeleteCart={(variantId) => checkout.onDeleteCart(variantId)}
              // disableActions={(quantity) => quantity === 0}
              // disableVariant={(variant) => !variant?.stock}
              disabled
            />
          )}
        </Grid>
      </Grid>

      {product?.main_features?.length && (
        <Box
          gap={5}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          sx={{ my: 10 }}
        >
          {product?.main_features?.map((item) => (
            <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
              <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

              <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
                {item.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Card
        sx={{
          mt: 2,
        }}
      >
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {[
            { value: 'description', label: 'توضیحات' },
            // { value: 'reviews', label: `نظرات (${product?.reviews?.length || 0})` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <ProductDetailsDescription description={product?.description} />
        )}

        {tabs.value === 'reviews' && (
          <ProductDetailsReview
            ratings={product?.ratings}
            reviews={product?.reviews}
            totalRatings={product?.totalRatings}
            totalReviews={product?.totalReviews}
          />
        )}
      </Card>
      {/* <Box sx={{ mt: 2, py: 2, px: 2 }}>
        <Typography variant="h4" mx={2} my={3}>
          محصولات مشابه
        </Typography>
        <ProductSimilar products={similarProducts} />
      </Box> */}
    </Container>
  );
}
