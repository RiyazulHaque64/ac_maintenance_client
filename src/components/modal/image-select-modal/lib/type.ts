export interface IFile {
  id: string;
  user_id?: string;
  name: string;
  alt_text: string;
  type: string;
  size: number;
  width: number;
  height: number;
  path: string;
  bucket_id: string;
  created_at: string;
  updated_at: string;
  galleryId?: string;
  uploaded_by?: {
    id: string;
    name: string;
  };
}

export type TFileQueryParam = {
  name: string;
  value: string | number;
};

export type TFileErrorData = {
  statusCode: number;
  success: boolean;
  message: string;
  errorSources: { path: string; message: string }[];
};
