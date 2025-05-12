import { RHFEditor } from './rhf-editor';
import { RHFTextField } from './rhf-text-field';
import { RHFImageSelect } from './rhf-image-select';
import { RHFUpload, RHFUploadBox, RHFUploadAvatar } from './rhf-upload';

// ----------------------------------------------------------------------

export const Field = {
  Text: RHFTextField,
  Upload: RHFUpload,
  UploadBox: RHFUploadBox,
  UploadAvatar: RHFUploadAvatar,
  Editor: RHFEditor,
  ImageSelect: RHFImageSelect,
};
