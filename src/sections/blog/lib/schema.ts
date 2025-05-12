import { z as zod } from 'zod';

export const NewBlogSchema = zod.object({
  title: zod.string(),
  tags: zod.array(zod.string()),
  content: zod.string(),
  thumbnail: zod.string(),
});
