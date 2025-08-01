import z from 'zod';

export const activitySchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getMyActivityeRequestSchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
});

export const getMyActivityeResponseSchema = z.object({
  cursorId: z.number().nullable(),
  activities: z.array(activitySchema),
  totalCount: z.number(),
});

export const deleteMyActivityeRequestSchema = z.object({
  activityId: z.number().positive(),
});

// -------------------- 타입 정의 --------------------

export type Activity = z.infer<typeof activitySchema>;

export type GetMyActivityeRequestQuery = z.infer<
  typeof getMyActivityeRequestSchema
>;
export type GetMyActivityeResponse = z.infer<
  typeof getMyActivityeResponseSchema
>;
export type DeleteMyActivityeRequestQuery = z.infer<
  typeof deleteMyActivityeRequestSchema
>;
