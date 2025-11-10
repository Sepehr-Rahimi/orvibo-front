import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';
import { Select, IconButton, OutlinedInput } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { updateOrder } from 'src/actions/orders';
import { blockedTransitions, ORDER_PAYMENT_STATUS, ORDER_STATUS_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { OrderStatusSelect } from './order-status-select';
import { DeleteConfirmDialog } from './delete-confirm-dialog';

// ----------------------------------------------------------------------

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow, orderMutate }) {
  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const statusFull = ORDER_STATUS_OPTIONS.find((s) => +s.value === +row.status);
  const paymentFull = ORDER_PAYMENT_STATUS.find((s) => s.value === row.payment_status);

  // const [statusFields, setStatusFields] = useState({
  //   status: statusFull.value,
  //   payment_status: paymentFull.value,
  // });

  const user = row?.user;

  const handleStatusChange = useCallback(
    async (event, label) => {
      // console.log(row.id);
      // console.log(event.target);

      const res = await updateOrder({ id: row.id, [label]: event.target.value });
      orderMutate();
      // if (res.status === 200) setStatusFields((prev) => ({ ...prev, [label]: event.target.value }));
      // console.log(res);
    },
    [orderMutate, row.id]
  );

  const renderPrimary = (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell> */}

      <TableCell>
        <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
          {row.id}
        </Link>
      </TableCell>

      {/* <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row.customer.name} src={row.customer.avatarUrl} />

          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">{row.customer.name}</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.customer.email}
            </Box>
          </Stack>
        </Stack>
      </TableCell> */}

      <TableCell>
        <ListItemText
          primary={fDate(row.created_at)}
          secondary={fTime(row.created_at)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        {user && <Label variant="soft">{`${row?.user?.first_name} ${row?.user?.last_name}`}</Label>}{' '}
      </TableCell>
      <TableCell>
        <Label variant="soft">{row.address.full_name}</Label>
      </TableCell>
      <TableCell>
        {/* <Label
          variant="soft"
          color={
            (row?.status === '2' && 'success') ||
            // (status === 'pending' && 'warning') ||
            (row?.status === '3' && 'error') ||
            'default'
          }
        >
          {statusFull?.label}
        </Label> */}

        <OrderStatusSelect
          selectedStatus={statusFull}
          options={ORDER_STATUS_OPTIONS}
          handleStatusChange={(event) => handleStatusChange(event, 'status')}
          menuItemDisabled={(option) =>
            !blockedTransitions[statusFull.value].includes(option.value)
          }
        />
      </TableCell>
      <TableCell>
        <OrderStatusSelect
          handleStatusChange={(event) => handleStatusChange(event, 'payment_status')}
          menuItemDisabled={(option) =>
            row.type_of_payment === '1' && [0, 1].includes(option.value)
          }
          options={ORDER_PAYMENT_STATUS}
          selectedStatus={paymentFull}
        />
        {/* <Select
          // labelId="demo-simple-select-label"
          // value={statusFields.payment_status}
          // disabled={row.type_of_payment === '1'}
          size="small"
          value={paymentFull.value}
          label="order_status"
          onChange={(event) => handleStatusChange(event, 'payment_status')}
          sx={{ ...paymentFull.theme, border: paymentFull.theme.color }}
          inputProps={{ 'aria-label': 'Without label' }}
          input={<OutlinedInput />}
        >
           <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem> 
          {ORDER_PAYMENT_STATUS.map((option) => (
            <MenuItem
              // if user buy and pay from website the admin cannot change its typeofpayment to paid or notpaid
              disabled={row.type_of_payment === '1' && [0, 1].includes(option.value)}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select> */}
      </TableCell>

      <TableCell align="center"> {row.total_quantity} </TableCell>

      <TableCell> {fCurrency(row.total_cost)} </TableCell>

      {/* <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'completed' && 'success') ||
            (row.status === 'pending' && 'warning') ||
            (row.status === 'cancelled' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell> */}

      {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell> */}

      {statusFull && paymentFull && (
        <TableCell>
          <IconButton
            color="error"
            sx={{ mx: 'auto' }}
            onClick={() => confirm.onTrue()}
            disabled={!(statusFull?.value === '1' && paymentFull?.value === 0)}
          >
            <Iconify icon="solar:trash-bin-minimalistic-broken" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {row.order_items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                }}
              >
                <Avatar
                  src={item.coverUrl}
                  variant="rounded"
                  sx={{ width: 48, height: 48, mr: 2 }}
                />

                <ListItemText
                  primary={item.name}
                  secondary={item.sku}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />

                <div>x{item.quantity} </div>

                <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.price)}</Box>
              </Stack>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      {/* <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </MenuList>
      </CustomPopover>
      */}

      <DeleteConfirmDialog
        mutateData={orderMutate}
        orderId={row.id}
        onClose={confirm.onFalse}
        open={confirm.value}
      />
      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="حذف سفارش"
        content={
          <Box>
            <Typography>آیا از حذف این سفارش اطمینان دارید؟</Typography>
          </Box>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              await deleteOrder(row.id);
              orderMutate();
              confirm.onFalse();
            }}
          >
            حذف
          </Button>
        }
      /> */}
    </>
  );
}
