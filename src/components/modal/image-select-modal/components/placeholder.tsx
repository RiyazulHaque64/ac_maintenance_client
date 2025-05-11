import type { BoxProps } from '@mui/material';

import { Box, Stack } from '@mui/material';

import { UploadIllustration } from 'src/assets/illustrations';

type ImageSelectPlaceholderProps = BoxProps & {
  heading?: string;
  subHeading?: string;
};

export function ImageSelectPlaceholder({
  heading = 'Drop or select image',
  subHeading,
  sx,
  ...other
}: ImageSelectPlaceholderProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{
        ...sx,
        px: 2,
        pt: 2,
        pb: 6,
        '&:hover': { opacity: 0.72 },
      }}
      {...other}
    >
      <UploadIllustration hideBackground sx={{ width: 200 }} />

      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Box sx={{ typography: 'h6' }}>{heading}</Box>
        {subHeading && (
          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{subHeading}</Box>
        )}
      </Stack>
    </Box>
  );
}
