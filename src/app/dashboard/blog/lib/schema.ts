import { z as zod } from 'zod';

export const NewBlogSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  tags: zod.array(zod.string()),
  content: zod.string().min(1, 'Content is required'),
  thumbnail: zod.string(),
  images: zod.array(zod.string()),
});
