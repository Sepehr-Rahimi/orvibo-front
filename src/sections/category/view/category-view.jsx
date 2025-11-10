'use client';

import { Card, Stack } from '@mui/material';

import CustomTreeItem from '../tree-item';

export default function CategoryView({ treeCategories }) {
  // const { treeCategories } = useGetTreeCategories();

  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <Stack direction="column" spacing={1}>
        {treeCategories.map((i) => (
          <CustomTreeItem {...i} itemId={i.id} />
        ))}
      </Stack>
      {/* <StyledTreeList sx={{ padding: 3 }} items={treeCategories} /> */}
    </Card>
  );
}
