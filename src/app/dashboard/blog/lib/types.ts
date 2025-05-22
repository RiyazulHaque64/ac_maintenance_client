import type { z } from 'zod';

import type { NewBlogSchema } from './schema';

export type TNewBlog = z.infer<typeof NewBlogSchema>;

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
