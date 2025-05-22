import React from 'react';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const BlogView = () => {
  console.log('blog view');
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
      This is the dashboard
    </DashboardContent>
  );
};

export default BlogView;
