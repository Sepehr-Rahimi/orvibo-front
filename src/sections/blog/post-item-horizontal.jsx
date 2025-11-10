import { toast } from 'sonner';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { maxLine } from 'src/theme/styles';
import { deleteBlog } from 'src/actions/blog-ssr';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function PostItemHorizontal({ post }) {
  const theme = useTheme();

  const popover = usePopover();
  const confirmRows = useBoolean();

  const router = useRouter();

  const {
    title,
    // author,
    is_published,
    cover,
    created_at,
    totalViews,
    totalShares,
    totalComments,
    description,
    id,
  } = post;

  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <Stack spacing={1} sx={{ p: theme.spacing(3, 3, 2, 3), flexGrow: '1' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft" color={(is_published && 'info') || 'default'}>
              {is_published ? 'منتشر شده' : 'منتشر نشده'}
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(created_at)}
            </Box>
          </Box>

          <Stack spacing={1} flexGrow={1}>
            <Link
              component={RouterLink}
              href={paths.adminDashboard.post.details(title)}
              color="inherit"
              variant="subtitle2"
              sx={{ ...maxLine({ line: 2 }) }}
            >
              {title}
            </Link>

            <Typography variant="body2" sx={{ ...maxLine({ line: 2 }), color: 'text.secondary' }}>
              {description}
            </Typography>
          </Stack>

          <Box display="flex" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            {/* <Box
              gap={1.5}
              flexGrow={1}
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{ typography: 'caption', color: 'text.disabled' }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Iconify icon="eva:message-circle-fill" width={16} />
                {fShortenNumber(totalComments)}
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <Iconify icon="solar:eye-bold" width={16} />
                {fShortenNumber(totalViews)}
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <Iconify icon="solar:share-bold" width={16} />
                {fShortenNumber(totalShares)}
              </Box>
            </Box> */}
          </Box>
        </Stack>

        <Box
          sx={{
            p: 1,
            width: 180,
            height: 240,
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {/* <Avatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{ top: 16, right: 16, zIndex: 9, position: 'absolute' }}
          /> */}
          <Image alt={title} src={cover} sx={{ height: 1, borderRadius: 1.5 }} />
        </Box>
      </Card>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'bottom-center' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.adminDashboard.post.details(title));
            }}
          >
            <Iconify icon="solar:eye-bold" />
            مشاهده
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(paths.adminDashboard.post.edit(title));
            }}
          >
            <Iconify icon="solar:pen-bold" />
            ویرایش
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              confirmRows.onTrue();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            حذف
          </MenuItem>
        </MenuList>
      </CustomPopover>
      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="حذف"
        content={<>آیا از حذف {title} مطمئنید؟ </>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              confirmRows.onFalse();
              try {
                await deleteBlog(id);

                toast.success('با موفقیت حذف شد!');
                router.refresh();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            حذف
          </Button>
        }
      />
    </>
  );
}
