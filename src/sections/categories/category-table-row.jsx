'use client';

import { useRouter } from 'next/navigation';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

export function BrandTableRow({ row, selected, onDeleteRow, onEditRow }) {
  // const isActive = useBoolean(row?.is_active);

  const confirm = useBoolean();

  const popover = usePopover();

  const router = useRouter();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        {/* <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          {/* <Stack spacing={2} direction="row" alignItems="center"> */}
          {/* {row.image_url ? (
            <Iconify icon={row.image_url} />
          ) : ( */}
          <Avatar alt={row.name} src={row.image_url} />
          {/* )} */}

          {/* <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack> */}
          {/* </Stack> */}
        </TableCell>

        <TableCell
          onClick={() => router.push(`${paths.adminDashboard.categories.root}/${row?.id}`)}
          sx={{ whiteSpace: 'nowrap' }}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {row.name}
        </TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.english_name}</TableCell> */}

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.description}</TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.website_url}</TableCell> */}

        {/* <TableCell>
          <Switch
            defaultChecked={row.is_active}
            checked={isActive.value}
            onChange={(v) => {
              isActive.setValue(v.target.checked);
              updateBrand({ ...row, is_active: v.target.checked, image_url: undefined });
            }}
          />
        </TableCell> */}

        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'banned' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="ویرایش" placement="top" arrow>
              <IconButton
                // color={quickEdit.value ? 'inherit' : 'default'}

                onClick={onEditRow}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
            <IconButton
              // color={quickEdit.value ? 'inherit' : 'default'}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>

            {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton> */}
          </Stack>
        </TableCell>
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

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
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </MenuList>
      </CustomPopover> */}

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="حذف"
        content="آیا مطمئن هستید که می خواهید حذف کنید؟"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => onDeleteRow(row.id, confirm.onFalse)}
          >
            حذف
          </Button>
        }
      />
    </>
  );
}
