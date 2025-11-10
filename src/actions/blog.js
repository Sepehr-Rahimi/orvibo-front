import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

// ----------------------------------------------------------------------

export const createBlog = async ({
  title,
  summary,
  content,
  tags,
  meta_title,
  meta_description,
  meta_keywords,
  is_published,
  cover,
}) => {
  try {
    const params = {
      title,
      summary,
      content,
      tags,
      meta_title,
      meta_description,
      meta_keywords,
      is_published,
      cover,
    };

    const res = await axiosInstance.post(endpoints.blogs.create, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during creating blog:', error);
    throw error;
  }
};
export const updateBlog = async ({
  id,
  title,
  summary,
  content,
  tags,
  meta_title,
  meta_description,
  meta_keywords,
  is_published,
  cover,
}) => {
  try {
    const params = {
      title,
      summary,
      content,
      tags,
      meta_title,
      meta_description,
      meta_keywords,
      is_published,
      cover,
      id,
    };

    const url = `${endpoints.blogs.update}/${id}`;

    const res = await axiosInstance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error during creating blog:', error);
    throw error;
  }
};

export function useGetBlogs(params, isAdmin) {
  const url = isAdmin ? endpoints.blogs.adminList : endpoints.blogs.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      blogs: data?.data || [],
      blogsLoading: isLoading,
      blogsError: error,
      blogsValidating: isValidating,
      blogsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBlogByTitle(title, isAdmin) {
  const url = title
    ? [
        isAdmin
          ? `${endpoints.blogs.detailsByTitleAdmin}/${title}`
          : `${endpoints.blogs.detailsByTitle}/${title}`,
      ]
    : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      blog: data?.data,
      blogLoading: isLoading,
      blogError: error,
      blogValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title) {
  const url = title ? [endpoints.post.latest, { params: { title } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: data?.latestPosts || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query) {
  const url = query ? [endpoints.post.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
