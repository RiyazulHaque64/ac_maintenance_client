import type { z } from 'zod';

import type { LoginSchema } from './schema';

export type LoginSchemaType = z.infer<typeof LoginSchema>;
