import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(5),
  lastName: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.enum(['user', 'admin']).default('user'),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  isVerified: z.boolean().optional(),
  address: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
