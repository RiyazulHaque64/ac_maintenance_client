import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import BlogForm from './components/blog-form';

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
      <BlogForm />
    </DashboardContent>
  );
};

export default NewBlogView;
