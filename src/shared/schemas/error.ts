import z from 'zod';

export const errorResponseSchema = z.object({
  message: z.string(),
  statusCode: z.number().optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
