'use client';

import type { z as zod } from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Alert, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { Form, Field } from 'src/components/hook-form';
import { AutoCompleteWithAdding } from 'src/components/hook-form/auto-complete-with-adding';

import { NewBlogSchema } from '../lib/schema';

// ----------------------------------------------------------------------

export type TNewBlog = zod.infer<typeof NewBlogSchema>;

// ----------------------------------------------------------------------

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

export default function BlogForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    title: '',
    tags: [],
    content: '',
    thumbnail: '',
  };

  const methods = useForm<TNewBlog>({
    mode: 'onSubmit',
    resolver: zodResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  console.log(errors);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg('');
      console.log('submitted data: ', data);
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  return (
    <Stack direction="column" alignItems="center">
      <Card
        sx={{
          p: 6,
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
