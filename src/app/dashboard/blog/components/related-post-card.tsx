import React from 'react';

import Link from '@mui/material/Link';
import { Stack, Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { maxLine } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

import type { IPost } from '../lib/types';

type Props = {
  post: IPost;
};

const RelatedPostCard = ({ post }: Props) => {
  const { title, thumbnail, slug } = post;
  return (
    <Stack direction="row" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Stack sx={{ width: '34%' }}>
        <Image
          alt={title}
          src={
            thumbnail
              ? `${CONFIG.supabase.url}/${thumbnail}`
              : '/assets/images/image-placeholder.jpg'
          }
          sx={{
            borderRadius: '8px 0 0 8px',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Stack>
      <Stack direction="column" alignItems="flex-start" sx={{ width: '66%', p: 1 }}>
        <Link
          component={RouterLink}
          href={`/dashboard/blog/${slug}`}
          color="inherit"
          variant="subtitle2"
          sx={{ ...maxLine({ line: 2 }) }}
        >
          {post.title}
        </Link>
        <Button
          variant="text"
          size="small"
          component={RouterLink}
          href={`/dashboard/blog/${slug}`}
          color="primary"
          endIcon={<Iconify icon="solar:arrow-right-outline" />}
          sx={{ fontWeight: 'regular', mt: 1 }}
        >
          Read more
        </Button>
      </Stack>
    </Stack>
  );
};

export default RelatedPostCard;
