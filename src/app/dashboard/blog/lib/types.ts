import type { z } from 'zod';

import type { NewBlogSchema } from './schema';

export type TNewBlog = z.infer<typeof NewBlogSchema>;
