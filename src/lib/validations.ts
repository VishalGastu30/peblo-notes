import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Note API Validations
export const getNotesQuerySchema = z.object({
  search: z.string().optional().default(''),
  tags: z.string().optional(), // Comma-separated tag IDs
  archived: z.enum(['true', 'false']).optional().default('false'),
  sort: z.enum(['updated', 'created', 'title']).optional().default('updated'),
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
});

export const createNoteSchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().nullable().optional(),
  tagIds: z.array(z.string()).optional(),
});

export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  contentText: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  categoryId: z.string().nullable().optional(),
  isArchived: z.boolean().optional(),
  isPinned: z.boolean().optional(),
});
