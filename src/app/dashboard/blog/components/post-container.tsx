import type { IMeta } from 'src/types/common';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { EmptyContent } from 'src/components/empty-content';

import { PostCard } from './post-card';
import { PostItemSkeleton } from './post-skeleton';

import type { IPost } from '../lib/types';

// ----------------------------------------------------------------------

type Props = {
  data: IPost[];
  meta?: IMeta;
  loading?: boolean;
  refetch: () => void;
};

export function PostContainer({ loading, data, meta, refetch }: Props) {
  const renderLoading = <PostItemSkeleton variant="horizontal" />;

  const renderList = data.map((item) => <PostCard key={item.id} post={item} refetch={refetch} />);

  const renderEmpty = (
    <EmptyContent
      title="No post found"
      sx={{
        borderRadius: 1,
        border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
      }}
    />
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        {loading ? renderLoading : renderList}
      </Box>

      {!loading && !data.length && renderEmpty}

      {meta && meta.total > meta.limit && (
        <Pagination
          count={meta.total}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </Box>
  );
}
