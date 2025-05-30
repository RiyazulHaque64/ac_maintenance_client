import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { UploadIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  showSubHeading?: boolean;
};

export function UploadPlaceholder({ sx, showSubHeading = true, ...other }: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={sx}
      {...other}
    >
      <UploadIllustration hideBackground sx={{ width: 200 }} />

      <Stack spacing={1} sx={{ textAlign: 'center' }}>
        <Box sx={{ typography: 'h6' }}>Drop or select file</Box>
        {showSubHeading && (
          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
            Drop images here or click to
            <Box
              component="span"
              sx={{ mx: 0.5, color: 'primary.main', textDecoration: 'underline' }}
            >
              browse
            </Box>
            through your machine.
          </Box>
        )}
      </Stack>
    </Box>
  );
}
