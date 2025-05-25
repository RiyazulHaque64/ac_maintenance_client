import type { IMeta, TFilterOption } from 'src/types/common';

import type { TPostFilter, TPostExtendedMeta } from './types';

export const FILTER_BY_DEFAULT_OPTION: TFilterOption = { value: '', label: 'All' };
export const SORT_BY_DEFAULT_OPTION: TFilterOption = { value: '', label: 'Latest' };

export const FilterByOptions = (meta?: IMeta & TPostExtendedMeta) => {
  const options = [
    { ...FILTER_BY_DEFAULT_OPTION },
    { value: 'published', label: `Published (${meta?.stats?.published || 0})` },
    { value: 'draft', label: `Draft (${meta?.stats?.draft || 0})` },
    { value: 'featured', label: `Featured (${meta?.stats?.featured || 0})` },
    { value: 'unfeatured', label: `Unfeatured (${meta?.stats?.unfeatured || 0})` },
  ];
  return options;
};

export const SORT_BY_OPTIONS = [
  { ...SORT_BY_DEFAULT_OPTION },
  { value: 'oldest', label: `Oldest` },
  { value: 'title_desc', label: `Title (A → Z)` },
  { value: 'title_asc', label: `Title (Z → A)` },
];

export const formatQueryObj = (filterObj: TPostFilter, searchTerm: string) => {
  const queryObj: Record<string, any> = {
    ...filterObj,
  };
  if (searchTerm.length > 0) queryObj.search_term = searchTerm;
  if (filterObj.sort_by?.value === 'oldest') {
    queryObj.sort_by = 'created_at';
    queryObj.sort_order = 'desc';
  } else if (filterObj.sort_by?.value === 'title_asc') {
    queryObj.sort_by = 'title';
    queryObj.sort_order = 'asc';
  } else if (filterObj.sort_by?.value === 'title_desc') {
    queryObj.sort_by = 'title';
    queryObj.sort_order = 'desc';
  } else {
    delete queryObj.sort_by;
    delete queryObj.sort_order;
  }
  return queryObj;
};
