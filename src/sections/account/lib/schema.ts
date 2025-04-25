import { z as zod } from 'zod';

export const ChangePasswordSchema = zod
  .object({
    old_password: zod
      .string()
      .min(1, { message: 'Old password is required!' })
      .min(6, { message: 'Password should be at least 6 characters!' }),
    new_password: zod
      .string({ required_error: 'New password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: 'Password must contain at least one letter and one number!',
      }),
    confirm_password: zod
      .string({ required_error: 'Password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirm_password'],
        message: 'Passwords do not match!',
      });
    }
  });
