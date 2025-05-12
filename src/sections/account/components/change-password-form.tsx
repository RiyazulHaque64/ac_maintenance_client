'use client';

import type { z as zod } from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Alert, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import api from 'src/utils/axios';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { ChangePasswordSchema } from '../lib/schema';

// ----------------------------------------------------------------------

export type TChangePassword = zod.infer<typeof ChangePasswordSchema>;

// ----------------------------------------------------------------------

export function ChangePasswordForm() {
  const old_password = useBoolean();
  const new_password = useBoolean();
  const confirm_password = useBoolean();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };

  const methods = useForm<TChangePassword>({
    mode: 'onSubmit',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setErrorMsg('');
      const res = await api.post('/auth/reset-password', {
        old_password: data.old_password,
        new_password: data.new_password,
      });
      console.log(res);
      if (res.status === 200) {
        reset();
        toast.success('Password changed successfully!');
        router.push(paths.dashboard.root);
      }
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
            md: '60%',
            xl: '50%',
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
              <Typography variant="subtitle2">Old Password</Typography>
              <Field.Text
                name="old_password"
                placeholder="Old Password"
                type={old_password.value ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={old_password.onToggle} edge="end">
                        <Iconify
                          icon={old_password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">New Password</Typography>
              <Field.Text
                name="new_password"
                placeholder="New Password"
                type={new_password.value ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={new_password.onToggle} edge="end">
                        <Iconify
                          icon={new_password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field.Text
                name="confirm_password"
                placeholder="Confirm Password"
                type={confirm_password.value ? 'text' : 'password'}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={confirm_password.onToggle} edge="end">
                        <Iconify
                          icon={confirm_password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Update
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
