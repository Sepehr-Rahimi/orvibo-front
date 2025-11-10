import React from 'react';

import { Box, Link, Stack, Avatar, useTheme } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

export default function CustomTreeItem(props) {
  const theme = useTheme();

  const { value: expanded, onToggle } = useBoolean(false);

  // MUI hook to manage expansion state

  return (
    <Box
      sx={{
        marginLeft: 2,
      }}
    >
      <Stack direction="column" spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            backgroundColor: varAlpha(theme.vars.palette.grey['400Channel'], 0.25),
            borderRadius: 1,
            paddingX: 2,
            paddingY: 0.5,
          }}
        >
          {props?.children && (
            <Box
              onClick={onToggle}
              sx={{
                cursor: 'pointer',
              }}
            >
              {expanded ? (
                <Iconify icon="solar:alt-arrow-down-outline" />
              ) : (
                <Iconify icon="solar:alt-arrow-left-outline" />
              )}
            </Box>
          )}
          {props?.image_url && (
            <Avatar
              alt={props?.name}
              src={props?.image_url}
              sx={{
                padding: 1,
                backgroundColor: varAlpha(theme.vars.palette.grey['50Channel']),
              }}
            />
          )}
          <Link href={paths.product.byCategory(props?.name)}>{props?.name}</Link>
        </Stack>
        {expanded && props?.children && (
          <Stack direction="column" spacing={1}>
            {props?.children?.map((c) => (
              <CustomTreeItem {...c} />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
