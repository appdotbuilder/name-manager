import { z } from 'zod';

// Name schema
export const nameSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Name = z.infer<typeof nameSchema>;

// Input schema for creating names
export const createNameInputSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").trim()
});

export type CreateNameInput = z.infer<typeof createNameInputSchema>;

// Input schema for updating names
export const updateNameInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name cannot be empty").trim()
});

export type UpdateNameInput = z.infer<typeof updateNameInputSchema>;

// Input schema for deleting names
export const deleteNameInputSchema = z.object({
  id: z.number()
});

export type DeleteNameInput = z.infer<typeof deleteNameInputSchema>;