'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetBlogs, useSearchPosts } from 'src/actions/blog';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostListHorizontal } from '../post-list-horizontal';

// ----------------------------------------------------------------------

export function PostListView() {
  const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { blogs, blogsLoading } = useGetBlogs(undefined, true);

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const filters = useSetState({ publish: 'همه' });

  const dataFiltered = applyFilter({ inputData: blogs, filters: filters.state, sortBy });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      filters.setState({ publish: newValue });
    },
    [filters]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="لیست بلاگ ها"
        links={[
          { name: 'داشبورد', href: paths.adminDashboard.root },
          { name: 'بلاگ', href: paths.adminDashboard.post.root },
          { name: 'لیست بلاگ ها' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.adminDashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            پست جدید
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

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
          hrefItem={(title) => paths.dashboard.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack> */}

      <Tabs
        value={filters.state.publish}
        onChange={handleFilterPublish}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {['همه', 'منتشر شده', 'منتشر نشده'].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            icon={
              <Label
                variant={((tab === 'همه' || tab === filters.state.publish) && 'filled') || 'soft'}
                color={(tab === 'منتشر شده' && 'info') || 'default'}
              >
                {tab === 'همه' && blogs.length}

                {tab === 'منتشر شده' && blogs.filter((post) => post.is_published).length}

                {tab === 'منتشر نشده' && blogs.filter((post) => !post.is_published).length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={dataFiltered} loading={blogsLoading} />
    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { publish } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['created_at'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['created_at'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  if (publish !== 'همه') {
    inputData = inputData.filter((post) =>
      publish === 'منتشر شده' ? post.is_published : !post.is_published
    );
  }

  return inputData;
};
