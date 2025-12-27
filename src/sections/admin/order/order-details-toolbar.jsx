import { useRouter } from 'next/navigation';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Button, Link } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { userRoleIs } from 'src/utils/helper';
import { fDateTime } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { blockedTransitions, ORDER_PAYMENT_STATUS, ORDER_STATUS_OPTIONS } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { LogoBlack } from 'src/components/logo/logoBlack';

import { OrderStatusSelect } from './order-status-select';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { OrderSelectPdfDownlowd } from './order-select-pdf-download';
import { OrderFinalizeButton } from './components/order-finalize-button';

// ----------------------------------------------------------------------

export function OrderDetailsToolbar({
  status,
  paymentStatus,
  typeOfPayment,
  backLink,
  createdAt,
  orderNumber,
  statusOptions,
  paymentStatusOptions,
  onChangeStatus,
  userRole,
  choosedAccount,
}) {
  const { roles } = CONFIG;
  const router = useRouter();

  const dialog = useBoolean();

  const statusFull = statusOptions.find((s) => +s.value === +status);
  const paymentStatusFull = paymentStatusOptions.find((s) => s.value === +paymentStatus);
  // console.log(paymentStatus);
  // console.log(paymentStatusFull);

  const isAuth = userRoleIs([roles.admin, roles.seller], userRole);
  const isAdmin = userRoleIs(roles.admin, userRole);
  const userDashboard = isAdmin ? 'adminDashboard' : 'dashboard';
  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        className="print-flex-container"
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={backLink} className="printOff">
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4"> سفارش {orderNumber} </Typography>
              {/* <Label
                variant="soft"
                color={
                  (status === '2' && 'success') ||
                  // (status === 'pending' && 'warning') ||
                  (status === '3' && 'error') ||
                  'default'
                }
              >
                {statusFull?.label}
              </Label> */}

              <Typography variant="body1" mt={0.5}>
                {statusFull?.label}{' '}
                <Typography component="span" color="text.secondary">
                  / {paymentStatusFull?.label}
                </Typography>
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(createdAt)}
            </Typography>
          </Stack>
        </Stack>
        <LogoBlack className="print-only" />

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          justifyItems="center"
          alignContent="center"
          className="printOff"
        >
          <Stack direction="row" gap={1} height={40} width={1} justifyContent="end">
            <OrderSelectPdfDownlowd
              choosedAccount={choosedAccount}
              isAdmin={isAdmin}
              orderNumber={orderNumber}
            />

            {!isAuth && paymentStatus === 0 && <OrderFinalizeButton orderId={orderNumber} />}
          </Stack>
          {isAuth && (
            <>
              <Stack direction="row" gap={1}>
                {statusFull && (
                  <OrderStatusSelect
                    handleStatusChange={(event) => onChangeStatus(event.target.value, 'status')}
                    menuItemDisabled={(option) =>
                      !blockedTransitions[statusFull.value].includes(option.value)
                    }
                    options={ORDER_STATUS_OPTIONS}
                    selectedStatus={statusFull}
                  />
                )}
                {paymentStatusFull && (
                  <OrderStatusSelect
                    handleStatusChange={(event) =>
                      onChangeStatus(event.target.value, 'payment_status')
                    }
                    menuItemDisabled={(option) =>
                      typeOfPayment === '1' && [0, 1].includes(option.value)
                    }
                    options={ORDER_PAYMENT_STATUS}
                    selectedStatus={paymentStatusFull}
                  />
                )}
              </Stack>
              <Stack direction="row" width={1} gap={1} justifyContent="space-between">
                <Button
                  sx={{ height: 40, flex: 1 }}
                  color="primary"
                  variant="contained"
                  startIcon={<Iconify icon="solar:pen-bold" />}
                  onClick={() => router.push(paths[userDashboard].factor.edit(orderNumber))}
                >
                  ویرایش
                </Button>
                {statusFull && paymentStatusFull && (
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ height: 40, flex: 1 }}
                    startIcon={<Iconify icon="solar:trash-bin-minimalistic-broken" />}
                    disabled={!(statusFull.value === '1' && paymentStatusFull.value === 0)}
                    onClick={dialog.onTrue}
                  >
                    حذف
                  </Button>
                )}
                {isAdmin && (
                  <Box>
                    <Link
                      href="./en"
                      underline="none"
                      sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        cursor: 'pointer',
                        // ml: 2,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      EN
                    </Link>
                  </Box>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
      <DeleteConfirmDialog
        open={dialog.value}
        onClose={dialog.onFalse}
        orderId={orderNumber}
        mutateData={() => {
          router.prefetch(paths[userDashboard].order.root);
          router.push(paths[userDashboard].order.root);
        }}
      />
    </>
  );
}
