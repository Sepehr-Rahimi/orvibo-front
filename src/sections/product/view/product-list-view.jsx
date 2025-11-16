'use client';

import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import {
  deleteProduct,
  updateProduct,
  useGetProducts,
  getAdminProductList,
} from 'src/actions/product';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductTableFiltersResult } from '../product-table-filters-result';
import {
  RenderCellCode,
  RenderCellStock,
  RenderCellPrice,
  RenderCellModel,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellDiscountPrice,
  RenderCellCurrencyPrice,
  RenderCellDiscountPercentage,
} from '../product-table-row';

// ----------------------------------------------------------------------

// const PUBLISH_OPTIONS = [
//   { value: 'published', label: 'Published' },
//   { value: 'draft', label: 'Draft' },
// ];

// const HIDE_COLUMNS = { category: false };

// const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ProductListView() {
  const confirmRows = useBoolean();

  const [deleteDialogID, setDeleteDialogId] = useState('');

  const router = useRouter();

  const { pagination } = useGetProducts(undefined, true);

  const rowCount = pagination?.total;
  // console.log(rowCount);

  const filters = useSetState({ publish: [], stock: [] });

  const [tableData, setTableData] = useState([]);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const debouncedQuery = useDebounce(searchInput, 1000);

  // const [rowCount, setRowCount] = useState(null);

  const [sortModel, setSortModel] = useState([]);

  const [rowEdited, setRowEdited] = useState({});

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  // const [dataFiltered, setDataFiltered] = useState([]);

  // const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const handleFieldUpdate = useCallback(
    async (newRow) => {
      const oldRow = tableData.find((row) => row.id === newRow.id);

      const res = await updateProduct({
        ...newRow,
      });

      if (res.status === 200 && JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
        setRowEdited(newRow);
      } else if (res.status !== 200) return oldRow;

      return newRow;
    },
    [tableData]
  );

  // useEffect(() => {
  //   if (products.length) {
  //     setTableData(products);
  //   }
  // }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // console.log('its called');
      const field = sortModel[0]?.field;

      const orderField = sortModel[0]?.sort;
      // because we dont have discount_percentage column in db
      const sortField = field === 'discount_percentage' ? 'discount_price' : field || undefined;

      const res = await getAdminProductList({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        sort: sortField || undefined,
        order: orderField || undefined,
        search: debouncedQuery,
      });

      // console.log(sortModel);
      // console.log(res);
      // const sortField = sortModel[0]?.field;
      // const sortOrder = sortModel[0]?.sort;
      // console.log(paginationModel);
      // console.log(res.pagination.total);

      setTableData(res.products);
      // console.log(tableData);
      setLoading(false);
    };

    fetchData();
  }, [paginationModel, sortModel, debouncedQuery, rowEdited]);

  useEffect(() => {
    if (debouncedQuery && paginationModel.page !== 0) {
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const canReset = filters.state.publish.length > 0 || filters.state.stock.length > 0;

  // useEffect(() => {
  //   setDataFiltered(applyFilter({ inputData: tableData, filters: filters.state }));
  // }, [tableData, filters]);

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        await deleteProduct({ id });

        const deleteRow = tableData.filter((row) => row.id !== id);

        toast.success('با موفقیت حذف شد!');

        setTableData(deleteRow);
      } catch (error) {
        console.log(error);
      }
    },
    [tableData]
  );

  // const handleDeleteRows = useCallback(() => {
  //   const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

  //   toast.success('Delete success!');

  //   setTableData(deleteRows);
  // }, [selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.adminDashboard.product.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.adminDashboard.product.details(id));
    },
    [router]
  );

  const handleFilterInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={tableData?.length}
        onOpenConfirmDeleteRows={confirmRows.onTrue}
        onchangeInput={handleFilterInputChange}
        inputDefaultValue={searchInput}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.state, selectedRowIds]
  );

  const columns = [
    {
      field: 'id',
      headerName: 'محصول',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => (
        <RenderCellProduct params={params} onViewRow={() => handleViewRow(params.row.id)} />
      ),
    },
    // {
    //   field: 'createdAt',
    //   headerName: 'Create at',
    //   width: 160,
    //   renderCell: (params) => <RenderCellCreatedAt params={params} />,
    // },
    {
      field: 'code',
      headerName: 'کد محصول',
      width: 160,
      renderCell: (params) => <RenderCellCode params={params} />,
    },
    {
      field: 'model',
      headerName: 'مدل محصول',
      width: 160,
      renderCell: (params) => <RenderCellModel params={params} />,
    },
    // {
    //   field: 'stock',
    //   headerName: 'موجودی',
    //   width: 100,
    //   renderCell: (params) => <RenderCellStock params={params} />,
    //   editable: true,
    // },
    // {
    //   field: 'currency_price',
    //   headerName: 'نرخ قیمت',
    //   width: 140,
    //   renderCell: (params) => <RenderCellCurrencyPrice params={params} />,
    //   editable: true,
    // },
    // {
    //   field: 'price',
    //   headerName: ' قیمت',
    //   width: 140,
    //   renderCell: (params) => <RenderCellPrice params={params} />,
    // },
    // {
    //   field: 'discount_percentage',
    //   headerName: 'درصد تخفیف',
    //   width: 140,
    //   renderCell: (params) => <RenderCellDiscountPercentage params={params} />,
    //   editable: true,
    // },
    // {
    //   field: 'discount_price',
    //   headerName: 'قیمت با تخفیف',
    //   width: 140,
    //   renderCell: (params) => <RenderCellDiscountPrice params={params} />,
    // },
    {
      field: 'is_published',
      headerName: 'نمایش در سایت',
      width: 110,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <ConfirmDialog
          open={confirmRows.value && deleteDialogID === params.row.id}
          onClose={confirmRows.onFalse}
          title="حذف"
          content={<>آیا از حذف {params.row.name} مطمئنید؟ </>}
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteRow(params.row.id);

                confirmRows.onFalse();
              }}
            >
              حذف
            </Button>
          }
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="مشاهده"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="ویرایش"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="حذف"
          onClick={() => {
            confirmRows.onTrue();
            setDeleteDialogId(params.row.id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  // const getTogglableColumns = () =>
  //   columns
  //     .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
  //     .map((column) => column.field);

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="لیست"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'محصولات', href: paths.adminDashboard.product.root },
          { name: 'لیست محصولات' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.adminDashboard.product.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            محصول جدید
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          height: { xs: 800 },
          flexDirection: { md: 'column' },
        }}
      >
        {rowCount && (
          <DataGrid
            // checkboxSelection
            disableRowSelectionOnClick
            page={paginationModel.page}
            rows={tableData}
            rowCount={rowCount}
            columns={columns}
            loading={loading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[25, 50]}
            pagination
            paginationMode="server"
            filterMode="server"
            onSortModelChange={(newModel) => setSortModel(newModel)}
            paginationModel={paginationModel}
            onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
            // initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
            // onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            // columnVisibilityModel={columnVisibilityModel}
            // onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            processRowUpdate={(e) => handleFieldUpdate(e)}
            onProcessRowUpdateError={(err) => console.error(err)}
            slots={{
              toolbar: CustomToolbarCallback,
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              panel: { anchorEl: filterButtonEl },
              toolbar: { setFilterButtonEl },
              // columnsManagement: { getTogglableColumns },
            }}
            sx={{
              [`& .${gridClasses.cell}`]: {
                alignItems: 'center',
                display: 'inline-flex',
              },
            }}
          />
        )}
      </Card>
    </DashboardContent>
  );
}

function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
  onchangeInput,
  inputDefaultValue,
}) {
  return (
    <>
      <GridToolbarContainer>
        {/* <ProductTableToolbar
          filters={filters}
          // options={{ stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS }}
        /> */}

        <GridToolbarQuickFilter
          onInput={onchangeInput}
          // value={inputDefaultValue}
          onClick={onchangeInput}
        />

        <Stack
          spacing={1}
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirmDeleteRows}
            >
              حذف ({selectedRowIds.length})
            </Button>
          )}

          <GridToolbarColumnsButton />
          <GridToolbarFilterButton ref={setFilterButtonEl} />
          <GridToolbarExport />
        </Stack>
      </GridToolbarContainer>

      {canReset && (
        <ProductTableFiltersResult
          filters={filters}
          totalResults={filteredResults}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}
    </>
  );
}

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
