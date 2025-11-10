import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';

import { useGetTreeCategories } from 'src/actions/categories';

import { NavUl } from 'src/components/nav-section';

import { NavList } from './nav-desktop-list';

// ----------------------------------------------------------------------

export function NavDesktop({ data, sx }) {
  const { treeCategories, treeCategoriesLoading } = useGetTreeCategories();
  const desktopData = [...data];

  if (!treeCategoriesLoading && treeCategories.length > 0) {
    const item = desktopData.find((navitem) => navitem.title === 'دسته بندی');
    const index = desktopData.indexOf(item);

    const newItem = {
      title: 'دسته بندی',
      path: paths.category,
      children: [
        ...treeCategories.map((cat) => ({
          subheader: cat.name,
          path: cat.href,
          items: [
            ...cat.children.map((sub) => ({
              title: sub.name,
              path: paths.product.byCategory(sub?.name),
            })),
          ],
        })),
      ],
    };

    desktopData.splice(index, 1, newItem);
  }

  return (
    <Stack component="nav" sx={{ height: 1, ...sx }}>
      <NavUl
        sx={{
          gap: 5,
          height: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {desktopData.map((list) => (
          <NavList key={list.title} data={list} />
        ))}
      </NavUl>
    </Stack>
  );
}
