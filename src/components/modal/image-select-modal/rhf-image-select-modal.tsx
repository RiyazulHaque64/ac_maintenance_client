'use client';

import type { DialogProps } from '@mui/material/Dialog';
import type { FieldValues, UseFormSetValue } from 'react-hook-form';
import type { IGetResponse, IErrorResponse } from 'src/types/common';

import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { grey } from '@mui/material/colors';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Tab,
  Card,
  Grid,
  Tabs,
  Alert,
  Stack,
  useTheme,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';

import api from 'src/utils/axios';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { Upload, MultiFilePreview } from 'src/components/upload';

import { useDebounce } from './lib/hook';
import { ImageItem } from './components/image-item';
import { ImageDetails } from './components/image-details';
import { FetchingError } from './components/fetching-error';
import { ImageFiltersToolbar } from './components/image-filters-toolbar';

import type { IFile } from './lib/type';

type RHFProps = DialogProps & {
  open: boolean;
  onClose: () => void;
  title?: string;
  selectedImages: string[];
  setSelectedImages: UseFormSetValue<FieldValues>;
  name: string;
  multiple?: boolean;
};

export function ImageSelectModalByRHF({
  open,
  onClose,
  title = 'Select Image',
  selectedImages,
  setSelectedImages,
  name,
  multiple = false,
  ...other
}: RHFProps) {
  const [selectedTab, setSelectedTab] = useState<string>('library');
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('This is an error');
  const [searchText, setSearchText] = useState<string>('');
  const [currentSelected, setCurrentSelected] = useState<IFile | null>(null);
  const [limit, setLimit] = useState<number>(50);
  const [loading, setLoading] = useState(false);
  const [getImagesResponse, setGetImagesResponse] = useState<IGetResponse<IFile> | null>(null);
  const [getImagesError, setGetImagesEror] = useState<IErrorResponse | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const searchTerm = useDebounce(searchText, 500);

  const onSelectImage = useCallback(
    (inputValue: IFile) => {
      if (multiple) {
        const newSelected = selectedImages?.includes(inputValue.path)
          ? selectedImages?.filter((value) => value !== inputValue.path)
          : [...selectedImages, inputValue.path];

        setSelectedImages(name, newSelected);
      } else {
        const path = selectedImages?.includes(inputValue.path) ? '' : inputValue.path;
        setSelectedImages(name, path);
      }
    },
    [selectedImages, setSelectedImages, multiple, name]
  );

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  }, []);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleUpload = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (!files.length) {
        setSelectedTab('library');
        return;
      }
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      const res = await api.post(`/file/upload`, formData);
      if (res.status === 201) {
        setSelectedTab('library');
        setFiles([]);
      }
    } catch (err) {
      setErrorMsg(typeof err === 'string' ? err : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (image: IFile) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.delete('/file/delete-files', {
        data: { paths: [image.path] },
      });
      if (res.status === 200) {
        setCurrentSelected(null);
        toast.success('Delete success!');
      }
    } catch (err) {
      toast.error((typeof err === 'string' ? err : err.message) || 'Failed to delete!');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await api.get(
          `/file?limit=${limit}${searchTerm && `&searchTerm=${searchTerm}`}`
        );
        if (res.status === 200) {
          setGetImagesResponse(res.data);
        }
      } catch (error) {
        setErrorMsg(error.message || 'Failed to get images');
        setGetImagesEror(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [limit, searchTerm, selectedTab]);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      {...other}
      sx={{
        '& .MuiDialog-paper': {
          width: '95%',
          maxWidth: '1000px',
          height: { xs: '100%', sm: 'calc(100vh - 100px)' },
        },
      }}
    >
      <DialogTitle sx={{ pb: { xs: 0, sm: 1 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              onClose();
              setFiles([]);
              setCurrentSelected(null);
              setSearchText('');
              if (!multiple) {
                setSelectedImages(name, []);
              }
            }}
          >
            <Iconify icon="line-md:close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 0, pb: 0, border: 'none' }}>
        {/* Tabs & Search */}
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            sx={{
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              width: selectedTab === 'library' ? { xs: '100%', sm: '60%' } : '100%',
              '& .MuiTabs-flexContainer': {
                gap: 3,
              },
            }}
          >
            <Tab
              iconPosition="start"
              value="library"
              label="Library"
              icon={<Iconify icon="ic:round-perm-media" />}
            />
            <Tab
              iconPosition="start"
              value="upload"
              label="Upload"
              icon={<Iconify icon="eva:cloud-upload-fill" />}
            />
          </Tabs>
          {selectedTab === 'library' && (
            <Stack
              sx={{
                width: { xs: '100%', sm: '40%' },
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                p: { xs: 1.5, sm: 0 },
              }}
            >
              <ImageFiltersToolbar searchText={searchText} setSearchText={setSearchText} />
            </Stack>
          )}
        </Stack>
        <Stack direction="row">
          <Box
            sx={{
              width:
                selectedTab === 'library' && currentSelected && !isSmallScreen ? '75%' : '100%',
              pr: selectedTab === 'library' ? 1 : 0,
              maxHeight: 'calc(100vh - 336px)',
              overflowY: 'auto',
              mt: { xs: 1, sm: 2 },
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.mode === 'light' ? grey[400] : grey[800],
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.mode === 'light' ? grey[500] : grey[900],
              },
            }}
          >
            {selectedTab === 'upload' && (
              <>
                {!!errorMsg && (
                  <Stack direction="row" justifyContent="center" sx={{ px: 2 }}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                      {errorMsg}
                    </Alert>
                  </Stack>
                )}
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  gap={2}
                  sx={{ px: { xs: 1, sm: 2 }, py: 1 }}
                >
                  <Box sx={{ width: { xs: '100%', md: `${files.length > 0 ? '30%' : '100%'}` } }}>
                    <Upload
                      multiple
                      accept={{ 'image/*': [] }}
                      value={files}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      previewMultiFile={false}
                      showSubHeading={false}
                    />
                  </Box>
                  {files.length > 0 && (
                    <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                      <MultiFilePreview
                        files={files}
                        thumbnail={false}
                        onRemove={handleRemoveFile}
                      />
                    </Box>
                  )}
                </Stack>
              </>
            )}

            {selectedTab === 'library' && (
              <>
                {loading && (
                  <Stack sx={{ height: 'calc(100vh - 336px)' }}>
                    <LoadingScreen />
                  </Stack>
                )}
                {!loading && getImagesError && (
                  <FetchingError
                    errorResponse={getImagesError}
                    statusCode={getImagesError.statusCode}
                    inModal
                  />
                )}
                {!loading && getImagesResponse?.data.length === 0 && (
                  <Stack sx={{ height: 'calc(100vh - 336px)' }}>
                    <EmptyContent title="No image found" />
                  </Stack>
                )}
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  {getImagesResponse?.data?.map((image) => (
                    <ImageItem
                      currentSelected={currentSelected}
                      setCurrentSelected={setCurrentSelected}
                      file={image}
                      key={image.id}
                      onSelect={() => onSelectImage(image)}
                      selected={selectedImages?.includes(image.path)}
                      onDelete={handleDelete}
                      deleteLoading={loading}
                    />
                  ))}
                </Grid>
                {!!getImagesResponse?.meta?.total && getImagesResponse?.meta?.total > limit && (
                  <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                    <Button variant="outlined" onClick={() => setLimit((prev) => prev + 50)}>
                      Show more
                    </Button>
                  </Stack>
                )}
              </>
            )}
          </Box>
          {selectedTab === 'library' && currentSelected && !isSmallScreen && (
            <Card
              sx={{
                width: '25%',
                height: 'calc(100vh - 336px)',
                p: 2,
                mx: 1,
                mt: { xs: 1, sm: 2 },
                overflowY: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <ImageDetails
                currentSelected={currentSelected}
                onDelete={handleDelete}
                deleteLoading={loading}
              />
            </Card>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {selectedTab === 'upload' ? (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={handleUpload}
            disabled={loading}
            sx={{
              ...(loading && {
                display: 'flex',
                width: '134px',
                justifyContent: 'flex-start',
                '&::after': {
                  content: '"."',
                  display: 'inline-block',
                  ml: '2px',
                  letterSpacing: '2px',
                  animation: 'dots 1.5s steps(3, end) infinite',
                },
                '@keyframes dots': {
                  '0%': { content: '"."' },
                  '33%': { content: '".."' },
                  '66%': { content: '"..."' },
                  '100%': { content: '"."' },
                },
              }),
            }}
          >
            {loading ? 'Uploading' : 'Upload'}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={() => {
              onClose();
              setCurrentSelected(null);
              setSearchText('');
            }}
          >
            Select
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
