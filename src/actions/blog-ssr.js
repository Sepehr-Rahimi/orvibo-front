import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getBlogs() {
  const res = await axios.get(endpoints.blogs.list);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getBlogByTitle(title, isAdmin) {
  const URL = title
    ? `${isAdmin ? endpoints.blogs.detailsByTitleAdmin : endpoints.blogs.detailsByTitle}/${title}`
    : '';

  const res = await axios.get(URL);

  return res?.data;
}

export async function getBlogById(id) {
  const URL = id ? `${endpoints.blogs.detailsById}/${id}` : '';

  const res = await axios.get(URL);

  return res?.data;
}

// ----------------------------------------------------------------------

export async function getLatestPosts(title) {
  const URL = title ? `${endpoints.post.latest}?title=${title}` : '';

  const res = await axios.get(URL);

  return res?.data;
}

export const deleteBlog = async (blogId) => {
  try {
    const url = `${endpoints.blogs.delete}/${blogId}`;

    const res = await axios.post(url);
  } catch (error) {
    console.error('Error during deleting blog:', error);
    throw error;
  }
};
