'use client';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { deleteBrand, useGetBrands } from 'src/actions/brands';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { BrandTableRow } from '../brand-table-row';
import { BrandTableToolbar } from '../brand-table-toolbar';
import { BrandTableFiltersResult } from '../brand-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'logo_url', label: 'لوگوی برند' },
  { id: 'name', label: 'نام برند' },
  { id: 'english_name', label: 'نام لاتین برند', width: 180 },
  { id: 'description', label: 'توضیحات', width: 220 },
  { id: 'website_url', label: 'آدرس سایت', width: 180 },
  { id: 'is_active', label: 'فعال', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function BrandListView() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const { brands: tableData, brandsLoading, brandsMutate } = useGetBrands();

  const filters = useSetState({ name: '' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  // const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    async (id, closeModal) => {
      await deleteBrand(id);
      closeModal();
      toast.success('حذف با موفقیت انجام شد!');
      brandsMutate();
    },
    [brandsMutate]
  );

  // const handleDeleteRows = useCallback(() => {
  //   toast.success('حذف با موفقیت انجام شد!');

  //   // setTableData(deleteRows);

  //   // table.onUpdatePageDeleteRows({
  //   //   totalRowsInPage: dataInPage.length,
  //   //   totalRowsFiltered: dataFiltered.length,
  //   // });
  // }, []);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.adminDashboard.brands.edit(id));
    },
    [router]
  );

  // const handleFilterStatus = useCallback(
  //   (event, newValue) => {
  //     table.onResetPage();
  //     filters.setState({ status: newValue });
  //   },
  //   [filters, table]
  // );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="لیست برندها"
          links={[
            { name: 'داشبورد', href: paths.adminDashboard.root },
            { name: 'برندها', href: paths.adminDashboard.brands.root },
            { name: 'لیست برندها' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.adminDashboard.brands.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              برند جدید
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <BrandTableToolbar filters={filters} onResetPage={table.onResetPage} />

          {canReset && (
            <BrandTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
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
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
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
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <BrandTableRow
                        key={row.id}
                        row={row}
                        // selected={table.selected.includes(row.id)}
                        // onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={handleDeleteRow}
                        onEditRow={() => handleEditRow(row.id)}
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

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
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

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
