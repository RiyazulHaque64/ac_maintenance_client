import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import PostForm from '../components/post-form';

const NewBlogView = () => {
  console.log('blog view');
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Add blog"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.blog },
          { name: 'New' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <PostForm />
    </DashboardContent>
  );
};

export default NewBlogView;
