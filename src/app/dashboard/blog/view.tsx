'use client';

import type { TError, IGetResponse } from 'src/types/common';

import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useDebounce } from 'src/hooks/use-debounce';

import { formatQueryString } from 'src/utils/helper';

import api from 'src/api/axios';
import endpoints from 'src/api/end-points';
import { DashboardContent } from 'src/layouts/dashboard';
import { DEFAULT_ERROR_STATE, DEFAULT_LIMIT_OPTION } from 'src/constants/common';

import { Iconify } from 'src/components/iconify';
import { FetchingError } from 'src/components/error/fetching-error';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostContainer } from './components/post-container';
import { PostFiltersState } from './components/post-filter-state';
import { PostFilterToolbar } from './components/post-filter-toolbar';
import { formatQueryObj, SORT_BY_DEFAULT_OPTION, FILTER_BY_DEFAULT_OPTION } from './lib/constants';

import type { IPost, TPostFilter, TPostExtendedMeta } from './lib/types';

// -------------------------------------- Component ------------------------------------
const BlogView = () => {
  // ------------------------------------ States ---------------------------------------
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>(DEFAULT_ERROR_STATE);
  const [data, setData] = useState<IGetResponse<IPost, TPostExtendedMeta> | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<TPostFilter>({
    page: 1,
    limit: DEFAULT_LIMIT_OPTION,
    filter_by: FILTER_BY_DEFAULT_OPTION,
    sort_by: SORT_BY_DEFAULT_OPTION,
    from_date: '',
    to_date: '',
  });

  // ------------------------------------ Hooks ----------------------------------------
  const searchTerm = useDebounce(searchText, 500);

  // ------------------------------------ Handler Functions ----------------------------
  const canReset =
    !!searchText || !!filter.filter_by.value || !!filter.from_date || !!filter.to_date;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(DEFAULT_ERROR_STATE);

      const queryObj = formatQueryObj(filter, searchTerm);
      const queryString = formatQueryString(queryObj);

      const response = await api.get(
        `${endpoints.blog.getAll}${queryString ? `?${queryString}` : ''}`
      );
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setError({
        message: err.message || 'Failed to fetch data',
        statusCode: err.statusCode || err.status || 500,
      });
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm]);

  // ------------------------------------ useEffect ------------------------------------
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Blog"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Blog' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.add_blog}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New post
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <PostFilterToolbar
        searchText={searchText}
        setSearchText={setSearchText}
        filter={filter}
        setFilter={setFilter}
        meta={data?.meta}
      />
      {canReset && (
        <PostFiltersState
          searchText={searchText}
          setSearchText={setSearchText}
          filter={filter}
          setFilter={setFilter}
          totalResults={data?.meta?.total || 0}
          sx={{ mt: 1 }}
        />
      )}
      {error?.message?.length > 0 ? (
        <FetchingError error={error} />
      ) : (
        <PostContainer
          loading={loading}
          data={data?.data || []}
          meta={data?.meta}
          refetch={fetchPosts}
        />
      )}
    </DashboardContent>
  );
};

export default BlogView;
