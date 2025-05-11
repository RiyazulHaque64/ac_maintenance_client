'use client';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Typography } from '@mui/material';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { fileFormat } from 'src/components/file-thumbnail';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import type { IFile } from '../lib/type';

type Props = {
  currentSelected: IFile;
  onDelete: (file: IFile) => void;
  deleteLoading: boolean;
};

export function ImageDetails({ currentSelected, onDelete, deleteLoading }: Props) {
  const popover = usePopover();

  return (
    <>
      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Name
          </Box>
          {currentSelected.name}
        </Stack>
        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Alt text
          </Box>
          {currentSelected.alt_text}
        </Stack>
        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Size
          </Box>
          {fData(currentSelected.size)}
        </Stack>

        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Modified
          </Box>
          {fDateTime(currentSelected.created_at)}
        </Stack>

        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Type
          </Box>
          {fileFormat(currentSelected.type)}
        </Stack>

        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Dimension (WxH)
          </Box>
          {`${currentSelected.width} x ${currentSelected.height} pixels`}
        </Stack>

        <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
          <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
            Uploaded by
          </Box>
          {`${currentSelected.uploaded_by?.first_name} ${currentSelected.uploaded_by?.last_name}` ||
            'Unknown'}
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="material-symbols:delete-outline-rounded" />}
            onClick={popover.onOpen}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        anchorEl={popover.anchorEl}
        slotProps={{ arrow: { placement: 'bottom-left' } }}
      >
        <Box sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle1">{currentSelected.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: '4px' }}>
            Are you sure want to delete this file?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={popover.onClose}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              size="small"
              color="error"
              onClick={() => onDelete(currentSelected)}
              disabled={deleteLoading}
              loading={deleteLoading}
            >
              Confirm
            </LoadingButton>
          </Stack>
        </Box>
      </CustomPopover>
    </>
  );
}
