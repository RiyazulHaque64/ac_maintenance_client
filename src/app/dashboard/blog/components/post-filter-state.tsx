import type { Dispatch, SetStateAction } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDate } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

import { FILTER_BY_DEFAULT_OPTION } from '../lib/constants';

import type { TPostFilter } from '../lib/types';

// ------------------------------------ Component ---------------------------------------
type Props = {
  totalResults: number;
  sx?: SxProps<Theme>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  filter: TPostFilter;
  setFilter: Dispatch<SetStateAction<TPostFilter>>;
};

export function PostFiltersState({
  totalResults,
  sx,
  searchText,
  setSearchText,
  filter,
  setFilter,
}: Props) {
  // ------------------------------------ Handler Functions ------------------------------
  const handleRemoveSearch = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  const handleRemoveFilter = useCallback(
    (name: string) => {
      setFilter({
        ...filter,
        [name]: name === 'filter_by' ? FILTER_BY_DEFAULT_OPTION : { label: '', value: '' },
      });
    },
    [setFilter, filter]
  );

  const handleReset = useCallback(() => {
    setSearchText('');
    setFilter({
      ...filter,
      filter_by: FILTER_BY_DEFAULT_OPTION,
      from_date: undefined,
      to_date: undefined,
    });
  }, [setSearchText, setFilter, filter]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Keyword:" isShow={!!filter.filter_by.value}>
        <Chip
          {...chipProps}
          label={filter.filter_by.label}
          onDelete={() => handleRemoveFilter('filter_by')}
        />
      </FiltersBlock>
      <FiltersBlock label="From:" isShow={!!filter.from_date}>
        <Chip
          {...chipProps}
          label={fDate(filter.from_date)}
          onDelete={() => setFilter({ ...filter, from_date: undefined })}
        />
      </FiltersBlock>

      <FiltersBlock label="To:" isShow={!!filter.to_date}>
        <Chip
          {...chipProps}
          label={fDate(filter.to_date)}
          onDelete={() => setFilter({ ...filter, to_date: undefined })}
        />
      </FiltersBlock>
      <FiltersBlock label="Keyword:" isShow={!!searchText}>
        <Chip {...chipProps} label={searchText} onDelete={handleRemoveSearch} />
      </FiltersBlock>
    </FiltersResult>
  );
}
