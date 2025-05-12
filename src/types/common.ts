export type TQueryParam = {
  name: string;
  value: string | number;
};

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
