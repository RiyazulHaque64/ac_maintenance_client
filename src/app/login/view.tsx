'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import api from 'src/api/axios';
import endpoints from 'src/api/end-points';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from 'src/auth/components/form-head';

import { LoginSchema } from './lib/schema';

import type { LoginSchemaType } from './lib/types';

// ----------------------------------------------------------------------

function LoginView() {
  // ------------------------------ State -------------------------------
  const [errorMsg, setErrorMsg] = useState('');

  // ------------------------------ Hooks -------------------------------
  const password = useBoolean();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('return_to') || '/dashboard';

  // ------------------------------ React Hook Form ---------------------
  const defaultValues = {
    email: 'maintenance07565@gmail.com',
    password: 'pass123',
  };

  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ------------------------------ Submit Values ------------------------
  const onSubmit = handleSubmit(async (data: LoginSchemaType) => {
    try {
      setErrorMsg('');
      const res = await api.post(endpoints.auth.login, data);
      localStorage.setItem('user', JSON.stringify(res.data.data));
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  // ------------------------------ JSX ----------------------------------
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="email"
        label="Email"
        placeholder="user@example.com"
        InputLabelProps={{ shrink: true }}
      />

      <Box gap={1.5} display="flex" flexDirection="column">
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

        <Field.Text
          name="password"
          label="Password"
          placeholder="password"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Login
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead title="Login to your account" sx={{ textAlign: { xs: 'center', md: 'left' } }} />

      <Alert severity={errorMsg ? 'error' : 'info'} sx={{ mb: 3 }}>
        {errorMsg || (
          <>
            Use your <strong>email</strong> to login your account
          </>
        )}
      </Alert>

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}

export default LoginView;
