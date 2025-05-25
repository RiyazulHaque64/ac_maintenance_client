import type { z } from 'zod';
import type { TFilterOption } from 'src/types/common';

import type { NewPostSchema } from './schema';

export type TNewPost = z.infer<typeof NewPostSchema>;

export type IDateValue = string | number | null;

export type IPostItem = {
  id: string;
  title: string;
  tags: string[];
  publish: string;
  content: string;
  coverUrl: string;
  metaTitle: string;
  totalViews: number;
  totalShares: number;
  description: string;
  totalComments: number;
  totalFavorites: number;
  metaKeywords: string[];
  metaDescription: string;
  createdAt: IDateValue;
  favoritePerson: { name: string; avatarUrl: string }[];
  author: { name: string; avatarUrl: string };
};

export type TAuthor = {
  id: string;
  name: string;
  contact_number: string;
  email: string;
  profile_pic?: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
};
export interface IPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  published: boolean;
  featured: boolean;
  author_id: string;
  author: TAuthor;
  created_at: string;
  updated_at: string;
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
