'use client';

import type { StackProps } from '@mui/material/Stack';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ------------------------------------ Component ---------------------------------------
type PostItemSkeletonProps = StackProps & {
  variant?: 'vertical' | 'horizontal';
  amount?: number;
};

export function RelatedPostSkeleton({ sx, amount = 10, ...other }: PostItemSkeletonProps) {
  return [...Array(amount)].map((_, index) => (
    <Stack
      key={index}
      sx={{
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 3, pt: 2 }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: 1 }}
        />
        <Stack flexGrow={1} spacing={1}>
          <Skeleton sx={{ height: 10 }} />
          <Skeleton sx={{ width: 0.5, height: 10 }} />
        </Stack>
      </Stack>
    </Stack>
  ));
}
