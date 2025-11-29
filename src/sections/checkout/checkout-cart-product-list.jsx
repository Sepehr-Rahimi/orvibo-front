import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

import { CheckoutCartProduct } from './checkout-cart-product';

// ----------------------------------------------------------------------

export function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const TABLE_HEAD = [
    { id: 'product', label: 'محصول' },
    // { id: 'kind', label: 'نوع' }
    { id: 'price', label: 'قیمت' },
    { id: 'quantity', label: 'تعداد' },
    { id: 'totalAmount', label: 'قیمت کل', align: 'right' },
    { id: '' },
  ];
  // .filter((r) => {
  //   if (products?.some((p) => p.kinds)) {
  //     return true;
  //   }
  //   return r.id !== 'kind';
  // });

  return (
    <Scrollbar autoHide={false}>
      <Table sx={{ minWidth: { md: 720 } }}>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {products.map((row) => (
            <CheckoutCartProduct
              key={row.cartItemId}
              row={{
                ...row,
                current_price:
                  row?.discount_price && row?.discount_price > 0 ? row?.discount_price : row?.price,
              }}
              onDelete={() => onDelete(row.variant_id)}
              onDecrease={() => onDecreaseQuantity(row.variant_id)}
              onIncrease={() => onIncreaseQuantity(row.variant_id)}
            />
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  );
}
