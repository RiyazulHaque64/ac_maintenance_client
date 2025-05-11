'use client';

import { grey } from '@mui/material/colors';
import { Box, Grid, Stack, IconButton, Typography, FormHelperText } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import { ImageSelectModal } from './image-select-modal';

// ----------------------------------------------------------------------

type Props = {
  values: string[];
  onSelectValues: (paths: string[]) => void;
  errorMessage?: string;
  modalTitle?: string;
  multiple?: boolean;
  placeholderHeading?: string;
  placeholderSubHeading?: string;
  multipleImageHeader?: string;
};

export function UploadByModal({
  values,
  onSelectValues,
  errorMessage,
  modalTitle = 'Select image',
  multiple = false,
  placeholderHeading,
  placeholderSubHeading,
  multipleImageHeader = 'Selected images',
}: Props) {
  const openImageModal = useBoolean();

  return (
    <>
      {multiple ? (
        <>
          <Box
            onClick={openImageModal.onTrue}
            sx={{
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
              border: (theme) =>
                `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
              transition: (theme) => theme.transitions.create(['opacity', 'padding']),
              borderRadius: 1,
              ...(!!errorMessage &&
                !values[0]?.length && {
                  color: 'error.main',
                  borderColor: 'error.main',
                  bgcolor: (theme) => varAlpha(theme.vars.palette.error.mainChannel, 0.08),
                }),
              px: 4,
              py: 1,
              textAlign: 'center',
              mt: 1,
              cursor: 'pointer',
            }}
          >
            <Typography>{placeholderHeading}</Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {values.map((path: string) => (
              <Grid item xs={12} sm={6} md={4} key={path}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    component="img"
                    src={`${CONFIG.supabase.url}/${path}`}
                    sx={{
                      width: '500px',
                      height: '320px',
                      borderRadius: 1,
                      objectFit: 'cover',
                      border: `2px dashed ${grey[400]}`,
                      bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.4),
                      transform: 'translate(36%, -36%)',
                      '&:hover': {
                        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.6),
                      },
                    }}
                    onClick={() => onSelectValues(values.filter((item: string) => item !== path))}
                  >
                    <Iconify icon="eva:close-fill" sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          {values[0]?.length > 0 ? (
            <Box
              sx={{
                bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                border: (theme) =>
                  `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                borderRadius: 1,
                ...(!!errorMessage &&
                  !values[0]?.length && {
                    color: 'error.main',
                    borderColor: 'error.main',
                    bgcolor: (theme) => varAlpha(theme.vars.palette.error.mainChannel, 0.08),
                  }),
                px: 4,
                py: 1,
                textAlign: 'center',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>{values[0]?.split('-')?.slice(1)?.join('-')}</Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Stack component="a" href={`${CONFIG.supabase.url}/${values[0]}`} target="_blank">
                    <Iconify
                      icon="mdi:eye-outline"
                      sx={{ color: grey[700], '&:hover': { color: grey[900] } }}
                    />
                  </Stack>
                  <Iconify
                    icon="ic:round-close"
                    sx={{ cursor: 'pointer', color: grey[700], '&:hover': { color: grey[900] } }}
                    onClick={() =>
                      onSelectValues(values.filter((item: string) => item !== values[0]))
                    }
                  />
                </Stack>
              </Stack>
            </Box>
          ) : (
            <Box
              onClick={openImageModal.onTrue}
              sx={{
                bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                border: (theme) =>
                  `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                borderRadius: 1,
                ...(!!errorMessage &&
                  !values[0]?.length && {
                    color: 'error.main',
                    borderColor: 'error.main',
                    bgcolor: (theme) => varAlpha(theme.vars.palette.error.mainChannel, 0.08),
                  }),
                px: 4,
                py: 1,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              {placeholderHeading}
            </Box>
          )}
        </>
      )}
      {errorMessage && !values[0]?.length && (
        <FormHelperText error={!!errorMessage} sx={{ px: 2 }}>
          {errorMessage}
        </FormHelperText>
      )}
      <ImageSelectModal
        open={openImageModal.value}
        onClose={openImageModal.onFalse}
        onSelectValues={onSelectValues}
        selectedFiles={values}
        title={modalTitle}
        multiple={multiple}
      />
    </>
  );
}
