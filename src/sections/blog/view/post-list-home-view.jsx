'use client';

import { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useDebounce } from 'src/hooks/use-debounce';

import { orderBy } from 'src/utils/helper';

import { useSearchPosts } from 'src/actions/blog';

import { PostList } from '../post-list';

// ----------------------------------------------------------------------

export function PostListHomeView({ posts }) {
  const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const dataFiltered = applyFilter({ inputData: posts, sortBy });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        بلاگ ها
      </Typography>

      {/* <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title) => paths.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack> */}

      <PostList posts={dataFiltered} />
    </Container>
  );
}

const applyFilter = ({ inputData, sortBy }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};
