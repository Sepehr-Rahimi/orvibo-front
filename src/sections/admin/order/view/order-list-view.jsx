'use client';

import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { updateOrder, useGetOrdersAdmin } from 'src/actions/orders';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import { OrderTableRow } from '../order-table-row';
import { OrderTableToolbar } from '../order-table-toolbar';
import { OrderTableFiltersResult } from '../order-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'همه سفارشات' }, ...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'id', label: 'شماره سفارش', width: 88 },
  // { id: 'name', label: 'Customer' },
  { id: 'created_at', label: 'تاریخ', width: 90 },
  { id: 'username', label: 'کاربر', width: 90 },
  { id: 'user_address', label: 'تحویل گیرنده', width: 90 },
  { id: 'status', label: 'وضعیت', width: 90 },
  { id: 'paymentStatus', label: 'وضعیت پرداخت', width: 90 },
  {
    id: 'total_quantity',
    label: 'تعداد محصولات',
    width: 95,
    align: 'center',
  },
  { id: 'total_cost', label: 'قیمت', width: 120 },
  { id: 'remove_order', label: 'حذف ', width: 50 },
  // { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function OrderListView() {
  const table = useTable({ defaultOrderBy: 'created_at', defaultOrder: 'desc' });

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([]);

  const { orders, ordersMutate } = useGetOrdersAdmin();

  useEffect(() => {
    if (orders.length) setTableData(orders);
    // console.log(orders);
  }, [orders]);

  const filters = useSetState({
    name: '',
    status: 'all',
    paymentStatus: '',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    filters.state.paymentStatus !== '' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // const handleDeleteRow = useCallback(
  //   (id) => {
  //     const deleteRow = tableData.filter((row) => row.id !== id);

  //     toast.success('Delete success!');

  //     setTableData(deleteRow);

  //     table.onUpdatePageDeleteRow(dataInPage.length);
  //   },
  //   [dataInPage.length, table, tableData]
  // );

  // const handleDeleteRows = useCallback(() => {
  //   const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

  //   toast.success('Delete success!');

  //   setTableData(deleteRows);

  //   table.onUpdatePageDeleteRows({
  //     totalRowsInPage: dataInPage.length,
  //     totalRowsFiltered: dataFiltered.length,
  //   });
  // }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.adminDashboard.order.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const handleFieldUpdate = useCallback(async (newRow, oldRow) => {
    // console.log(newRow);
    // console.log(oldRow);
    const res = await updateOrder({
      ...newRow,
    });

    return newRow;
  }, []);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="لیست سفارشات"
          links={[
            { name: 'داشبورد', href: paths.dashboard.root },
            { name: 'لیست سفارشات', href: paths.dashboard.order.root },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === '2' && 'success') ||
                      (tab.value === '1' && 'warning') ||
                      (tab.value === '3' && 'error') ||
                      'default'
                    }
                  >
                    {['1', '2', '3', '4'].includes(tab.value)
                      ? tableData.filter((order) => order.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <OrderTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {canReset && (
            <OrderTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            {/* <TableSelectedAction
              // dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            /> */}

            <Scrollbar sx={{ maxHeight: 444, maxWidth: 1150 }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={dataFiltered.length}
                  // numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     dataFiltered.map((row) => row.id)
                  //   )
                  // }
                />

                <TableBody>
                  {dataFiltered
                    // .slice(
                    //   table.page * table.rowsPerPage,
                    //   table.page * table.rowsPerPage + table.rowsPerPage
                    // )
                    .map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        orderMutate={ordersMutate}
                        // selected={table.selected.includes(row.id)}
                        // onSelectRow={() => table.onSelectRow(row.id)}
                        // onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          {/* <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            // onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          /> */}
        </Card>
      </DashboardContent>

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate, paymentStatus } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.id.toString().includes(name) ||
        order.address.full_name?.includes(name) ||
        order.user.first_name?.includes(name) ||
        order.user.last_name?.includes(name)
      //  ||
      //   order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
      //   order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (paymentStatus !== '') {
    inputData = inputData.filter((order) => order.payment_status === paymentStatus);
  }

  if (!dateError) {
    if (startDate && endDate) {
      // console.log(inputData);
      inputData = inputData.filter((order) => fIsBetween(order.created_at, startDate, endDate));
    }
  }

  return inputData;
}
