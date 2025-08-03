'use client';

import type { TError } from 'src/types/common';

import { m } from 'framer-motion';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getErrorName } from 'src/utils/helper';

import { ServerErrorIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

type Props = {
  error: TError;
  inModal?: boolean;
  action?: React.ReactNode;
};

export function FetchingError({ error, inModal = false, action }: Props) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      component={MotionContainer}
      sx={{ px: 4, py: inModal ? 0 : { xs: 8, sm: 6, lg: 7 } }}
    >
      <m.div variants={varBounce().in}>
        <Typography variant={inModal ? 'h5' : 'h3'} sx={{ mb: 1 }}>
          {error.statusCode || 500} {getErrorName(error.statusCode || 500)}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          {error.message || 'Internal Server Error'}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ServerErrorIllustration
          sx={{ my: inModal ? { xs: 1, sm: 3 } : { xs: 4, sm: 6 }, width: '300px' }}
        />
      </m.div>

      {!inModal && !action && (
        <Button onClick={() => window.location.reload()} size="large" variant="contained">
          Retry
        </Button>
      )}
      {action && action}
    </Stack>
  );
}
