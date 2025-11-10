'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';

import { useGetProduct } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductEditView(
  // { product }
  { productId }
) {
  const [product, setProduct] = useState();
  const { product: productData, productLoading } = useGetProduct(productId, true);
  useEffect(() => {
    setProduct(productData);
    // console.log(product);
    // console.log(productData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productLoading, productData]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="ویرایش محصول"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'محصولات', href: paths.adminDashboard.product.root },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductNewEditForm currentProduct={product} />
    </DashboardContent>
  );
}
