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
    uploaded_by?: {
        id: string;
        first_name: string;
        last_name: string;
    };
}

export type TFileQueryParam = {
    name: string;
    value: string | number;
};

export type TFileErrorData = {
    success: boolean;
    message: string;
    errorSources: { path: string; message: string }[];
};