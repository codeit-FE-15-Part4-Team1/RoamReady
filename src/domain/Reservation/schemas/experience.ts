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

export const getMyExperienceRequestSchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
});

export const getMyExperienceResponseSchema = z.object({
  cursorId: z.number(),
  activities: z.array(activitySchema),
  totalCount: z.number(),
});

export const deleteMyExperienceRequestSchema = z.object({
  activityId: z.number(),
});

// -------------------- 타입 정의 --------------------

export type Activity = z.infer<typeof activitySchema>;

export type GetMyExperienceRequestQuery = z.infer<
  typeof getMyExperienceRequestSchema
>;
export type GetMyExperienceResponse = z.infer<
  typeof getMyExperienceResponseSchema
>;
export type DeleteMyExperienceRequestQuery = z.infer<
  typeof deleteMyExperienceRequestSchema
>;
