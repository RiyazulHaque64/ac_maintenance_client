import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .refine(
      (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      {
        message: 'Invalid email',
      }
    ),
  password: z
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});
