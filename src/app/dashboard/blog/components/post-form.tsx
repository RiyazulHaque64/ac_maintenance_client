'use client';

import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Alert, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import api from 'src/api/axios';
import endpoints from 'src/api/end-points';
import { getTags } from 'src/services/utility';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { AutoCompleteWithAdding } from 'src/components/hook-form/auto-complete-with-adding';

import { NewPostSchema, postFormDefaultValues } from '../lib/schema';

import type { TNewPost } from '../lib/types';

// ------------------------------------ Component --------------------------------------
export default function PostForm() {
  // ------------------------------------ States ---------------------------------------
  const [errorMsg, setErrorMsg] = useState('');
  const [tagOptions, setTagOptions] = useState([]);

  // ------------------------------------ Hooks ----------------------------------------
  const { id }: { id: string } = useParams();
  const router = useRouter();

  // ------------------------------------ Fetcher --------------------------------------
  const { data: tags } = useSWR('tags', getTags);

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
      const res = id
        ? await api.patch(endpoints.blog.update(id), data)
        : await api.post(endpoints.blog.create, data);
      if (res.status === 201) {
        reset();
        toast.success('Post created successfully!');
        router.push(paths.dashboard.blog);
      }
      if (res.status === 200) {
        reset();
        toast.success('Post updated successfully!');
        router.push(paths.dashboard.blog);
      }
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  // ------------------------------------ useEffect ------------------------------------
  useEffect(() => {
    if (id) {
      const fetchPost = async (blogId: string) => {
        try {
          const res = await api.get(endpoints.blog.getSingle(blogId));
          if (res.status === 200) {
            const {
              data: { data },
            } = res;
            reset({ ...data, tags: data.tags.map((tag: any) => tag.id) });
          }
        } catch (err) {
          setErrorMsg(typeof err === 'string' ? err : err.message);
        }
      };
      fetchPost(id);
    }
  }, [id, reset]);

  useEffect(() => {
    if (tags) {
      setTagOptions(tags.data.map((tag: any) => ({ label: tag.name, value: tag.id })));
    }
  }, [tags]);

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
                options={tagOptions}
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
                {id ? 'Save changes' : 'Post'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
