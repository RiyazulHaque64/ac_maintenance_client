import type { z } from 'zod';
import type { TFilterOption } from 'src/types/common';

import type { NewPostSchema } from './schema';

export type TNewPost = z.infer<typeof NewPostSchema>;

export type IDateValue = string | number | null;

export type TPostAuthor = {
  id: string;
  name: string;
  email: string;
  contact_number: string;
  profile_pic: string;
};

export interface IPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  images: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
  author: TPostAuthor;
  tags: {
    id: string;
    name: string;
  }[];
}

export type TPostFilter = {
  page: number;
  limit: TFilterOption;
  filter_by: TFilterOption;
  sort_by: TFilterOption;
  from_date: string | undefined;
  to_date: string | undefined;
};

export type TPostExtendedMeta = {
  stats: { published: number; draft: number; featured: number; unfeatured: number };
};
