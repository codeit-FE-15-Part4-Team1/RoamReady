import z from 'zod';

export const getActivitiesRequestQuerySchema = z.object({
  method: z.enum(['offset', 'cursor']),
  cursorId: z.number().optional(),
  category: z
    .enum(['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'])
    .optional(),
  keyword: z.string().optional(),
  sort: z
    .enum(['most_reviewd', 'price_asc', 'price_desc', 'latest'])
    .optional(),
  page: z.number().default(1),
  size: z.number().default(20),
});

export type GetActivitiesRequestQuery = z.infer<
  typeof getActivitiesRequestQuerySchema
>;

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
  createdAt: z.coerce.date(), // 문자열을 Date 객체로 파싱
  updatedAt: z.coerce.date(),
});

export type Activity = z.infer<typeof activitySchema>;

export const getActivitiesResponseOffsetSchema = z.object({
  totalCount: z.number(),
  activities: z.array(activitySchema),
});

export type GetActivitiesOffsetResponse = z.infer<
  typeof getActivitiesResponseOffsetSchema
>;
