'use client';

import type { CardProps } from '@mui/material/Card';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Switch, Button, Typography, FormControlLabel } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, fToNow, isDate24HoursPast } from 'src/utils/format-time';

import api from 'src/api/axios';
import { maxLine } from 'src/theme/styles';
import { CONFIG } from 'src/config-global';
import endpoints from 'src/api/end-points';

import { Image } from 'src/components/image';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import type { IPost } from '../lib/types';

// ----------------------------------------------------------------------

type Props = CardProps & {
  post: IPost;
  refetch: () => void;
};

export function PostCard({ post, sx, refetch, ...other }: Props) {
  const { id, title, content, thumbnail, published, created_at, author, featured, slug } = post;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const popover = usePopover();
  const router = useRouter();
  const deleteConfirmation = useBoolean();
  const publishedPopover = usePopover();

  const handleDelete = useCallback(
    async (ids: string[]) => {
      try {
        setIsDeleting(true);
        const response = await api.delete(endpoints.blog.delete, { data: { ids } });
        if (response.status === 200) {
          toast.success('Success!');
          refetch();
        }
      } catch (err) {
        toast.error(err.message || 'Failed to delete post');
      } finally {
        setIsDeleting(false);
      }
    },
    [refetch]
  );

  const handleUpdate = useCallback(
    async (postId: string, data: Record<string, any>) => {
      try {
        setIsUpdating(true);
        const response = await api.patch(endpoints.blog.update(postId), data);
        if (response.status === 200) {
          toast.success('Success!');
          refetch();
        }
      } catch (err) {
        toast.error(err.message || 'Failed to update post');
      } finally {
        setIsUpdating(false);
      }
    },
    [refetch]
  );

  return (
    <>
      <Card sx={{ display: 'flex', ...sx }} {...other}>
        <Stack spacing={1} flexGrow={1} sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <FormControlLabel
              control={<Switch checked={published} />}
              onClick={publishedPopover.onOpen}
              label="Published"
            />
            <IconButton
              color="primary"
              title="Featured"
              onClick={() => handleUpdate(id, { featured: !featured })}
            >
              <Iconify icon={featured ? 'tabler:star-filled' : 'hugeicons:star'} />
            </IconButton>
          </Box>

          <Stack spacing={1} flexGrow={1}>
            <Link
              component={RouterLink}
              href=""
              color="inherit"
              variant="subtitle2"
              sx={{ ...maxLine({ line: 2 }) }}
            >
              {post.title}
            </Link>

            {/* <Typography variant="body2" sx={{ ...maxLine({ line: 2 }), color: 'text.secondary' }}>
              {content}
            </Typography> */}
            <Markdown
              children={content.length > 40 ? `${content.substring(0, 40)}...` : content}
              sx={{
                color: 'text.disabled',
                fontSize: 14,
              }}
            />
          </Stack>

          <Box display="flex" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <Box
              gap={1}
              flexGrow={1}
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{ typography: 'caption', color: 'text.disabled' }}
            >
              <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
                {author.name}
              </Box>
              <Box sx={{ width: 2, height: 16, borderRadius: 1, bgcolor: 'divider' }} />
              <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
                {isDate24HoursPast(new Date(created_at))
                  ? fDate(created_at)
                  : `${fToNow(created_at)} ago`}
              </Box>
            </Box>
          </Box>
        </Stack>

        <Box
          sx={{
            p: 1,
            width: 180,
            height: 240,
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Avatar
            alt={author.name}
            src={author.profile_pic}
            sx={{ top: 16, right: 16, zIndex: 9, position: 'absolute' }}
          />
          <Image
            alt={title}
            src={
              thumbnail
                ? `${CONFIG.supabase.url}/${thumbnail}`
                : '/assets/images/image-placeholder.jpg'
            }
            sx={{ height: 1, borderRadius: 1.5 }}
          />
        </Box>
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'bottom-center' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push('');
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              router.push(`/dashboard/blog/edit/${slug}`);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              deleteConfirmation.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
      <ConfirmDialog
        open={deleteConfirmation.value}
        onClose={deleteConfirmation.onFalse}
        title="Delete"
        content={<>Are you sure want to delete?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              await handleDelete([id]);
              deleteConfirmation.onFalse();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        }
      />

      <CustomPopover
        open={publishedPopover.open}
        onClose={publishedPopover.onClose}
        anchorEl={publishedPopover.anchorEl}
        slotProps={{ arrow: { placement: 'bottom-right' } }}
      >
        <Box sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle1">{published ? 'Unpublish' : 'Publish'}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: '4px' }}>
            Are you sure want to {published ? 'unnpublish' : 'publish'} this product?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={publishedPopover.onClose}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleUpdate(id, { published: !published })}
              disabled={isUpdating}
              loading={isUpdating}
            >
              Confirm
            </LoadingButton>
          </Stack>
        </Box>
      </CustomPopover>
    </>
  );
}
