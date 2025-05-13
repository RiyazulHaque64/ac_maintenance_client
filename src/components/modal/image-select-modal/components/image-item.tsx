import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { grey } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import {
  Grid,
  Stack,
  Button,
  useTheme,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import type { IFile } from '../lib/type';

// ----------------------------------------------------------------------

type Props = CardProps & {
  selected?: boolean;
  file: IFile;
  onSelect?: () => void;
  currentSelected: IFile | null;
  setCurrentSelected: React.Dispatch<React.SetStateAction<IFile | null>>;
  onDelete: (file: IFile) => void;
  deleteLoading: boolean;
};

export function ImageItem({
  file,
  selected,
  onSelect,
  currentSelected,
  setCurrentSelected,
  onDelete,
  deleteLoading,
  sx,
  ...other
}: Props) {
  const checkbox = useBoolean();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const deleteConfirmation = usePopover();

  const renderAction = (
    <Stack sx={{ position: 'absolute', top: { xs: 1, sm: 6 }, left: { xs: 1, sm: 6 } }}>
      <Box
        onMouseEnter={checkbox.onTrue}
        onMouseLeave={checkbox.onFalse}
        sx={{
          display: 'inline-flex',
          width: 30,
          height: 30,
        }}
      >
        <Checkbox
          checked={selected}
          onClick={onSelect}
          icon={<Iconify icon="eva:radio-button-off-fill" sx={{ width: '16px', height: '16px' }} />}
          checkedIcon={
            <Iconify icon="eva:checkmark-circle-2-fill" sx={{ width: '16px', height: '16px' }} />
          }
          inputProps={{ id: `item-checkbox-${file.id}`, 'aria-label': `Item checkbox` }}
          sx={{ width: 1, height: 1 }}
        />
      </Box>
      {isSmallScreen && (
        <IconButton size="small" color="error" onClick={deleteConfirmation.onOpen}>
          <Iconify icon="material-symbols:delete-outline" />
        </IconButton>
      )}
    </Stack>
  );

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '3 / 2',
          overflow: 'hidden',
          borderRadius: 1.2,
          boxShadow: 1,
          cursor: isSmallScreen ? 'pointer' : 'default',
          backgroundColor: grey[50],
          transition: 'transform 0.3s ease',
          transform: currentSelected?.id === file.id ? 'scale(1.02)' : 'none',
          border: currentSelected?.id === file.id ? `3px solid ${theme.palette.grey[300]}` : 'none',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        onClick={() => {
          if (currentSelected?.id === file.id) {
            setCurrentSelected(null);
          } else {
            setCurrentSelected(file);
          }
        }}
      >
        <img
          src={`${CONFIG.supabase.url}/${file.path}`}
          alt={file.alt_text || file.name}
          style={{
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            opacity: currentSelected?.id === file.id ? 0.8 : 1,
          }}
        />
        {renderAction}
      </Box>
      <CustomPopover
        open={deleteConfirmation.open}
        onClose={deleteConfirmation.onClose}
        anchorEl={deleteConfirmation.anchorEl}
        slotProps={{ arrow: { hide: true, placement: 'bottom-left' } }}
      >
        <Box sx={{ p: 1, maxWidth: 250 }}>
          <Typography variant="subtitle1" sx={{ fontSize: '0.8rem' }}>
            {file.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mt: '4px', fontSize: '0.7rem' }}
          >
            Are you sure want to delete this file?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={deleteConfirmation.onClose}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              size="small"
              color="error"
              onClick={() => onDelete(file)}
              disabled={deleteLoading}
              loading={deleteLoading}
            >
              Confirm
            </LoadingButton>
          </Stack>
        </Box>
      </CustomPopover>
    </Grid>
  );
}
