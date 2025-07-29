import z from 'zod';

export const searchSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
  data: z.date().optional(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
