import type { TFilterOption } from 'src/types/common';

export const LIMIT_OPTIONS: TFilterOption[] = [
  { value: 12, label: '12' },
  { value: 16, label: '16' },
  { value: 24, label: '24' },
  { value: 32, label: '32' },
  { value: 48, label: '48' },
  { value: 72, label: '72' },
];

export const DEFAULT_LIMIT_OPTION: TFilterOption = { value: 12, label: '12' };

export const DEFAULT_ERROR_STATE = { message: '', statusCode: null };
