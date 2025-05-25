'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Alert, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import api from 'src/api/axios';
import endpoints from 'src/api/end-points';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { AutoCompleteWithAdding } from 'src/components/hook-form/auto-complete-with-adding';

import { NewPostSchema, postFormDefaultValues } from '../lib/schema';

import type { TNewPost } from '../lib/types';

// ------------------------------------ Component -------------------------------------
const TAG_OPTIONS = [
  {
    label: 'Tag 1',
    value: 'tag 1',
  },
  {
    label: 'Tag 2',
    value: 'tag 2',
  },
  {
    label: 'Tag 3',
    value: 'tag 3',
  },
];

export default function PostForm() {
  // ------------------------------------ States ---------------------------------------
  const [errorMsg, setErrorMsg] = useState('');

  // ------------------------------------ Hooks ----------------------------------------
  const router = useRouter();

  // ------------------------------------ React Hook Form ------------------------------
  const methods = useForm<TNewPost>({
    mode: 'onSubmit',
    resolver: zodResolver(NewPostSchema),
    defaultValues: postFormDefaultValues(),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  // ------------------------------------ Submit Form ----------------------------------
  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg('');
      const res = await api.post(endpoints.blog.create, data);
      if (res.status === 201) {
        reset();
        toast.success('Post created successfully!');
        router.push(paths.dashboard.blog);
      }
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  return (
    <Stack direction="column" alignItems="center">
      <Card
        sx={{
          p: { xs: 2, sm: 3, md: 6 },
          width: {
            xs: '95%',
            sm: '75%',
          },
        }}
      >
        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}
        <Form methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <Field.Text name="title" label="Title" />
              <AutoCompleteWithAdding
                name="tags"
                label="Select tags"
                placeholder="tags"
                options={TAG_OPTIONS}
              />
              <Field.Editor
                name="content"
                sx={{ maxHeight: 480 }}
                placeholder="Write details about your title..."
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Media</Typography>
              <Field.ImageSelect
                name="thumbnail"
                modalTitle="Select thumbnail"
                placeholderHeading="Select or upload thumbnail"
              />
              <Field.ImageSelect
                name="images"
                modalTitle="Select additional images"
                placeholderHeading="Select or upload additional images"
                placeholderSubHeading="Additional images are optional"
                multipleImageHeader="Additional images"
                multiple
              />
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
