'use client';

import useSWR from 'swr';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Chip, Stack, Button, Typography } from '@mui/material';

import { fDate, fToNow, isDate24HoursPast } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';

import { getRelatedPosts } from '../lib/services';
import RelatedPostCard from '../components/related-post-card';
import { RelatedPostSkeleton } from '../components/related-post-skeleton';

import type { IPost } from '../lib/types';

type Props = {
  post: IPost;
};

const PostDetailsView = ({ post }: Props) => {
  const { slug, thumbnail, title, tags, content, author, created_at, updated_at, images } = post;

  const router = useRouter();

  // ------------------------------------ Fetcher --------------------------------------
  const { data: relatedPosts, isLoading: isRelatedPostsLoading } = useSWR(
    slug ? `/blog/related-posts/${slug}` : null,
    () => getRelatedPosts(slug)
  );

  console.log('relatedPosts', relatedPosts);

  return (
    <DashboardContent>
      <Stack direction="row" justifyContent="space-between">
        <Button
          startIcon={<Iconify icon="solar:arrow-left-outline" />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="tabler:edit" />}
          onClick={() => router.push(`/dashboard/blog/edit/${post.slug}`)}
        >
          Edit
        </Button>
      </Stack>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h3">{title}</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" gap={3}>
              <Stack direction="row" alignItems="center" gap={0.6} sx={{ color: 'text.secondary' }}>
                <Iconify icon="mingcute:user-1-line" sx={{ width: 18, height: 18 }} />
                <Typography variant="body2">{author?.name}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.6} sx={{ color: 'text.secondary' }}>
                <Iconify icon="lets-icons:date-today" sx={{ width: 18, height: 18 }} />
                <Typography variant="body2">
                  {isDate24HoursPast(new Date(created_at))
                    ? fDate(created_at)
                    : `${fToNow(created_at)} ago`}
                </Typography>
              </Stack>
              {created_at !== updated_at && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.6}
                  sx={{ color: 'text.secondary' }}
                >
                  <Iconify icon="material-symbols:update-rounded" sx={{ width: 18, height: 18 }} />
                  <Typography variant="body2">
                    {isDate24HoursPast(new Date(updated_at))
                      ? fDate(updated_at)
                      : `${fToNow(updated_at)} ago`}
                  </Typography>
                </Stack>
              )}
            </Stack>
            {tags?.length > 0 && (
              <Stack direction="row" gap={1}>
                {tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    variant="outlined"
                    color="primary"
                    size="small"
                    label={tag.name}
                    sx={{ textTransform: 'capitalize', borderRadius: 4 }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack sx={{ width: '70%' }}>
            <Image
              alt={title}
              src={
                thumbnail
                  ? `${CONFIG.supabase.url}/${thumbnail}`
                  : '/assets/images/image-placeholder.jpg'
              }
              sx={{
                height: '360px',
                borderRadius: 1,
                objectFit: 'cover',
                border: '1px solid',
                borderColor: 'divider',
              }}
            />
            <Markdown
              children={content}
              sx={{
                color: 'text.secondary',
                fontSize: 14,
              }}
            />
          </Stack>
          <Stack sx={{ width: '30%' }} gap={2}>
            {/* Additional images */}
            {images.length > 0 && (
              <Stack direction="column" gap={2}>
                {images.map((image) => (
                  <Image
                    key={image}
                    alt={title}
                    src={
                      image
                        ? `${CONFIG.supabase.url}/${image}`
                        : '/assets/images/image-placeholder.jpg'
                    }
                    sx={{
                      height: '170px',
                      borderRadius: 1,
                      objectFit: 'cover',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                ))}
              </Stack>
            )}
            <Stack direction="column" gap={2}>
              {isRelatedPostsLoading ? (
                <RelatedPostSkeleton />
              ) : (
                relatedPosts?.data?.map((p: IPost) => <RelatedPostCard key={p.id} post={p} />)
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </DashboardContent>
  );
};

export default PostDetailsView;
