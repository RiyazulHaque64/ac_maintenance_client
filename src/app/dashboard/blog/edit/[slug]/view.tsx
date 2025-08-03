import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import PostForm from '../../components/post-form';

const EditPostView = () => {
  console.log('edit post view');
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit post"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.blog },
          { name: 'Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <PostForm />
    </DashboardContent>
  );
};

export default EditPostView;
