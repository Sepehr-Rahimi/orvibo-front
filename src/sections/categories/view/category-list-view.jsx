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
import { RouterLink } from 'src/routes/components';
import { useParams, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { deleteCategories, useGetCategories, useGetParentCategories } from 'src/actions/categories';

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

import { BrandTableRow } from '../category-table-row';
import { BrandTableToolbar } from '../category-table-toolbar';
import { CategoryTableFiltersResult } from '../category-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image_url', label: 'آیکون دسته بندی' },
  { id: 'name', label: 'نام دسته بندی' },
  { id: 'description', label: 'توضیحات', width: 220 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function CategoryListView() {
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const params = useParams();

  const { Categories: parentCategories } = useGetParentCategories(params?.id || '');

  const { Categories: tableData, CategoriesMutate } = useGetCategories(params?.id);

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
      await deleteCategories(id);
      closeModal();
      toast.success('حذف با موفقیت انجام شد!');
      CategoriesMutate();
    },
    [CategoriesMutate]
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
      router.push(paths.adminDashboard.categories.edit(id));
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
          heading="لیست دسته بندی ها"
          links={[
            { name: 'داشبورد', href: paths.adminDashboard.root },
            { name: 'دسته بندی ها', href: paths.adminDashboard.categories.root },
            ...parentCategories.map((p) => ({
              name: p.name,
              href: `${paths.adminDashboard.categories.root}/${p?.id}`,
            })),
          ]}
          action={
            <Button
              component={RouterLink}
              href={`${paths.adminDashboard.categories.new}/${params?.id || ''}`}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              دسته بندی جدید
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <BrandTableToolbar filters={filters} onResetPage={table.onResetPage} />

          {canReset && (
            <CategoryTableFiltersResult
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
                  {dataFiltered.map((row) => (
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
