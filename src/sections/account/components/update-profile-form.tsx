'use client';

import type { z as zod } from 'zod';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import api from 'src/utils/axios';
import { fData } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { UpdateProfileSchema } from '../lib/schema';

// ----------------------------------------------------------------------

export type TUpdateProfileSchemaType = zod.infer<typeof UpdateProfileSchema>;

// ----------------------------------------------------------------------

export function UpdateProfileForm() {
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      profile_pic: null,
      name: '',
      email: '',
      contact_number: '',
    }),
    []
  );

  const methods = useForm<TUpdateProfileSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log('submitted data: ', data);
    try {
      setErrorMsg('');
      const formData = new FormData();
      const updatedData = {
        name: data.name,
        contact_number: data.contact_number,
      };
      formData.append('data', JSON.stringify(updatedData));
      if (data.profile_pic instanceof File) {
        formData.append('profile_pic', data.profile_pic);
      }
      const res = await api.patch('/user/update-profile', formData);
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data?.data));
        toast.success('Profile updated successfully');
        router.push(paths.dashboard.root);
        router.refresh();
      }
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      console.log('user: ', parsedUser);
      reset({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        contact_number: parsedUser.contact_number || '',
        profile_pic: parsedUser.profile_pic
          ? `${CONFIG.supabase.url}${parsedUser.profile_pic}`
          : null,
      });
    }
  }, [reset]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack direction="column" alignItems="center">
        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3, width: { xs: '100%', sm: '90%', md: '80%' } }}>
            {errorMsg}
          </Alert>
        )}

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ width: { xs: '100%', sm: '90%', md: '80%' } }}
        >
          <Card sx={{ pt: 10, pb: 5, px: 3, width: { xs: '100%', sm: '40%', md: '30%' } }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="profile_pic"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
          <Card sx={{ py: 10, px: 5, width: { xs: '100%', sm: '60%', md: '70%' } }}>
            <Stack spacing={2}>
              <Field.Text name="name" label="Full name" />
              <Field.Text name="email" label="Email address" disabled />
              <Field.Text name="contact_number" label="Contact number" />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Update
              </LoadingButton>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Form>
  );
}
