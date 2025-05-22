'use client';

import React, { useState } from 'react';

import { Tab, Tabs, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostListHorizontal } from './components/post-list-horinzontal';

const BlogView = () => {
  const [activeTab, setActiveTab] = useState('all');

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
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {['all', 'published', 'draft'].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            icon={
              <Label
                variant={((tab === 'all' || tab === 'draft') && 'filled') || 'soft'}
                color={(tab === 'published' && 'info') || 'default'}
              >
                {tab === 'all' && 3}

                {tab === 'published' && 4}

                {tab === 'draft' && 1}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>
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
