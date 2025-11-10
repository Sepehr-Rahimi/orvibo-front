import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import { deleteOrder } from 'src/actions/orders';

import { ConfirmDialog } from 'src/components/custom-dialog';

export const DeleteConfirmDialog = ({ open, onClose, mutateData, orderId }) => (
  //   const [restoreStock, setRestore] = useState(false);
  <ConfirmDialog
    open={open}
    onClose={onClose}
    title="حذف سفارش"
    content={
      <Box>
        <Typography my={2}>آیا از حذف این سفارش اطمینان دارید؟</Typography>
        {/* <FormControlLabel
            control={
              <Checkbox onChange={(event) => setRestore(event.target.value)} value={restoreStock} />
            }
            label="بازگرداندن موجودی محصولات"
          /> */}
      </Box>
    }
    action={
      <Button
        variant="contained"
        color="error"
        onClick={async () => {
          await deleteOrder(orderId);
          mutateData();
          onClose();
        }}
      >
        حذف
      </Button>
    }
  />
);
