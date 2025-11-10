import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getCategory(categoryId) {
  const url = categoryId ? `${endpoints.categories.one}/${categoryId}` : '';

  const res = await axios.get(url);

  return res?.data;
}
export async function getTreeCategories() {
  const url = `${endpoints.categories.treeList}`;

  const res = await axios.get(url);

  return res?.data;
}

export async function getAllCategoriesList() {
  const url = `${endpoints.categories.all}`;

  const res = await axios.get(url);

  return res?.data;
}

export async function getCategoryByName(name) {
  const url = name ? `${endpoints.categories.name}/${name}` : '';

  const res = await axios.get(url);

  return res?.data;
}
