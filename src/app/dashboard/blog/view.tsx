'use client';

import React, { useState, useEffect, useCallback } from 'react';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { formatQueryString } from 'src/utils/helper';

import api from 'src/api/axios';
import endpoints from 'src/api/end-points';
import { DashboardContent } from 'src/layouts/dashboard';
import { DEFAULT_LIMIT_OPTION } from 'src/constants/common';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostFiltersState } from './components/post-filter-state';
import { PostFilterToolbar } from './components/post-filter-toolbar';
import { PostListHorizontal } from './components/post-list-horinzontal';

import type { TPostFilter } from './lib/types';

const BlogView = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    success: boolean;
    message: string;
    meta: { page: number; limit: number; total: number };
    data: [];
  } | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<TPostFilter>({
    page: 1,
    limit: DEFAULT_LIMIT_OPTION,
    filter_by: { label: 'All', value: '' },
    from_date: '',
    to_date: '',
  });

  // ------------------------------ Handler Functions ---------------------------
  const canReset =
    !!searchText || !!filter.filter_by.value || !!filter.from_date || !!filter.to_date;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryString = formatQueryString(filter);

      const response = await api.get(
        `${endpoints.blog.getAll}${queryString ? `?${queryString}` : ''}`
      );
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to get posts');
    } finally {
      setLoading(false);
    }
  }, [filter]);

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
      />
      {canReset && (
        <PostFiltersState
          searchText={searchText}
          setSearchText={setSearchText}
          filter={filter}
          setFilter={setFilter}
          totalResults={100}
        />
      )}
      <PostListHorizontal
        posts={[
          {
            id: '1',
            title: 'This is blog title',
            tags: ['tag1', 'tag2', 'tag3'],
            publish: 'published',
            content: 'This is blog content',
            coverUrl:
              'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            metaTitle: 'Meta title',
            totalViews: 234,
            totalShares: 123,
            description: 'Description',
            totalComments: 123,
            totalFavorites: 123,
            metaKeywords: ['keyword1', 'keyword2', 'keyword3'],
            metaDescription: 'Meta description',
            createdAt: '2022-10-10',
            favoritePerson: [
              {
                name: 'John Doe',
                avatarUrl:
                  'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              },
            ],
            author: {
              name: 'John Doe',
              avatarUrl:
                'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
          },
        ]}
        loading={false}
      />
    </DashboardContent>
  );
};

export default BlogView;
