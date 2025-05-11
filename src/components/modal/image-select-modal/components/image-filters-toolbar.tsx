import type { Dispatch, SetStateAction } from 'react';

import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

export function ImageFiltersToolbar({ searchText, setSearchText }: Props) {
  // Handler
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );

  // JSX
  const renderSearchBox = (
    <TextField
      size="small"
      value={searchText}
      onChange={handleSearch}
      placeholder="Search image..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Stack
      spacing={{ xs: 1, md: 4 }}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      justifyContent={{ sm: 'space-between', md: 'flex-end' }}
    >
      {renderSearchBox}
    </Stack>
  );
}
