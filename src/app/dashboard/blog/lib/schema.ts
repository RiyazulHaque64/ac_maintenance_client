import { z as zod } from 'zod';

export const NewPostSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  tags: zod.array(zod.string()),
  content: zod.string().min(1, 'Content is required'),
  thumbnail: zod.string(),
  images: zod.array(zod.string()),
});

export const postFormDefaultValues = () => {
  const values = {
    title: '',
    tags: [],
    content: '',
    thumbnail: '',
    images: [],
  };

  return values;
};
