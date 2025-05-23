export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IGetResponse<T> {
  success: boolean;
  message: string;
  meta: IMeta;
  data: T[];
}

export interface IErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  errorSources: { path: string; message: string }[];
}

export type TFilterOption = { value: string | number; label: string };

export type TFilterObject = Record<string, string | number | TFilterOption | undefined>;
