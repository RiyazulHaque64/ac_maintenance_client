import type { Dispatch, SetStateAction } from 'react';
import type { TMeta, TFilterOption } from 'src/types/common';
import type { IDatePickerControl } from 'src/components/custom-date-picker/types';

import dayjs from 'dayjs';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, fIsAfter, fDateTime } from 'src/utils/format-time';

import { LIMIT_OPTIONS } from 'src/constants/common';

import { Iconify } from 'src/components/iconify';
import CSelect from 'src/components/custom-components/c-select';
import { CustomDatePicker } from 'src/components/custom-date-picker/custom-date-picker';

// ----------------------------------------------------------------------
export type TUserFilter = {
  page: number;
  limit: TFilterOption;
  role: TFilterOption;
  from_date: string | undefined;
  to_date: string | undefined;
};

export const ROLE_DEFAULT_OPTION: TFilterOption = { value: '', label: 'Role' };

type Props = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  filter: TUserFilter;
  setFilter: Dispatch<SetStateAction<TUserFilter>>;
  mode?: 'customer' | 'employee';
  meta?: TMeta & { by_role: { [key: string]: number } };
  view: 'grid' | 'list';
  handleChangeView: (e: React.MouseEvent<HTMLElement>, newView: 'list' | 'grid' | null) => void;
};

export function PostFilterToolbar({
  searchText,
  setSearchText,
  filter,
  setFilter,
  mode = 'customer',
  meta,
  view,
  handleChangeView,
}: Props) {
  const { from_date, to_date } = filter;

  // ------------------------------ State -------------------------------------
  const [dateError, setDateError] = useState<string>('');

  // ------------------------------ Hooks -------------------------------------
  const fromDate = useBoolean();
  const toDate = useBoolean();

  // ------------------------------ Options -----------------------------------
  const ROLE_OPTIONS = [
    { ...ROLE_DEFAULT_OPTION },
    { value: 'RETAILER', label: `Retailer (${meta?.by_role?.RETAILER || 0})` },
    { value: 'USER', label: `Consumer (${meta?.by_role?.USER || 0})` },
  ];

  // ------------------------------ Handler Functions --------------------------
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );
  const handleFromDate = useCallback(
    (newValue: IDatePickerControl) => {
      if (fIsAfter(newValue, new Date())) {
        setDateError('From date not be later than today');
      } else if (to_date && fIsAfter(newValue, to_date)) {
        setDateError('From date must be before than to date');
      } else {
        const formattedDate = fDateTime(newValue, 'YYYY-MM-DD') as string;
        setFilter({ ...filter, from_date: formattedDate });
        fromDate.onFalse();
        setDateError('');
      }
    },
    [to_date, filter, setFilter, fromDate]
  );
  const handleToDate = useCallback(
    (newValue: IDatePickerControl) => {
      if (from_date && fIsAfter(from_date, newValue)) {
        setDateError('To date must be later than start date');
      } else {
        const formattedDate = fDateTime(newValue, 'YYYY-MM-DD') as string;
        setFilter({ ...filter, to_date: formattedDate });
        toDate.onFalse();
        setDateError('');
      }
    },
    [from_date, filter, setFilter, toDate]
  );

  // ------------------------------ JSX ----------------------------------------
  const renderSearchBox = (
    <TextField
      value={searchText}
      onChange={handleSearch}
      placeholder="Search user..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: { xs: 1, md: 260 },
        '& .css-huc3o2-MuiInputBase-input-MuiOutlinedInput-input': { py: '11px' },
      }}
    />
  );

  const renderFromDate = (
    <>
      <Button
        color="inherit"
        variant="outlined"
        sx={{ textTransform: 'capitalize', width: { xs: '100%', sm: '154px' } }}
        onClick={() => {
          setDateError('');
          fromDate.onTrue();
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: 1, height: 32 }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Iconify icon="solar:calendar-bold-duotone" />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {from_date ? fDate(from_date) : 'From date'}
            </Typography>
          </Stack>
          <Iconify
            icon={fromDate.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </Stack>
      </Button>

      <CustomDatePicker
        title="Select from date"
        date={dayjs(from_date) || null}
        onChangeDate={handleFromDate}
        open={fromDate.value}
        onClose={fromDate.onFalse}
        selected={!!from_date}
        error={dateError}
      />
    </>
  );
  const renderToDate = (
    <>
      <Button
        color="inherit"
        variant="outlined"
        sx={{ textTransform: 'capitalize', width: { xs: '100%', sm: '154px' } }}
        onClick={() => {
          setDateError('');
          toDate.onTrue();
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: 1, height: 32 }}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Iconify icon="solar:calendar-bold-duotone" />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {to_date ? fDate(to_date) : 'To date'}
            </Typography>
          </Stack>
          <Iconify
            icon={toDate.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </Stack>
      </Button>

      <CustomDatePicker
        title="Select to date"
        date={dayjs(to_date) || null}
        onChangeDate={handleToDate}
        open={toDate.value}
        onClose={toDate.onFalse}
        selected={!!to_date}
        error={dateError}
      />
    </>
  );

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      sx={{ width: 1 }}
    >
      {renderSearchBox}
      <Stack
        spacing={1}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        justifyContent="flex-end"
        flexGrow={1}
      >
        <Stack direction="row" spacing={1}>
          {renderFromDate}
          {renderToDate}
        </Stack>
        <Stack direction="row" spacing={1}>
          {mode === 'customer' && (
            <CSelect
              label="Role"
              value={filter.role}
              onSelectValue={(value) => setFilter({ ...filter, role: value })}
              options={ROLE_OPTIONS}
            />
          )}
          <CSelect
            label="Show"
            options={LIMIT_OPTIONS}
            value={filter.limit}
            onSelectValue={(value) => setFilter({ ...filter, limit: value })}
          />
          <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
            <ToggleButton value="list">
              <Iconify icon="solar:list-bold" />
            </ToggleButton>

            <ToggleButton value="grid">
              <Iconify icon="mingcute:dot-grid-fill" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  );
}
