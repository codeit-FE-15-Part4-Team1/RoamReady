import z from 'zod';

export const tokenRefreshResponseSchema = z.object({
  refreshToken: z.string(),
  accessToken: z.string(),
});

export type TokenRefreshResponse = z.infer<typeof tokenRefreshResponseSchema>;
