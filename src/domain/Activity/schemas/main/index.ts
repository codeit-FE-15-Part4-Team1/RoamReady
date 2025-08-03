import z from 'zod';

export const getActivitiesRequestQuerySchema = z.object({
  method: z.enum(['offset', 'cursor']),
  cursorId: z.number().optional(),
  category: z
    .enum(['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'])
    .optional(),
  keyword: z.string().optional(),
  sort: z
    .enum(['most_reviewed', 'price_asc', 'price_desc', 'latest'])
    .optional(),
  page: z.number().default(1),
  size: z.number().default(20),
});

// ETL 데이터의 schedule 스키마
export const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

// ETL 데이터의 subImage 스키마
export const subImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

// 기존 activity 스키마 (하위 호환성을 위해 유지)
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

// ETL 데이터 구조에 맞는 activity 스키마
export const etlActivitySchema = z.object({
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
  subImages: z.array(subImageSchema),
  schedules: z.array(scheduleSchema),
});

// 통합된 Activity 타입 (기존 API와 ETL 데이터 모두 지원)
export const unifiedActivitySchema = z.object({
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
  subImages: z.array(subImageSchema).optional().default([]),
  schedules: z.array(scheduleSchema).optional().default([]),
});

// ETL 응답 스키마
export const etlResponseSchema = z.object({
  lastUpdated: z.string(),
  totalCount: z.number(),
  activities: z.array(etlActivitySchema),
});

export const getActivitiesResponseOffsetSchema = z.object({
  totalCount: z.number(),
  activities: z.array(activitySchema),
});

export const activitySearchSchema = z.object({
  keyword: z.string().optional(),
  address: z.string().optional(),
  date: z.date().optional(),
});

export type GetActivitiesRequestQuery = z.infer<
  typeof getActivitiesRequestQuerySchema
>;

export type Activity = z.infer<typeof unifiedActivitySchema>;

export type EtlActivity = z.infer<typeof etlActivitySchema>;

export type Schedule = z.infer<typeof scheduleSchema>;

export type SubImage = z.infer<typeof subImageSchema>;

export type EtlResponse = z.infer<typeof etlResponseSchema>;

export type GetActivitiesOffsetResponse = z.infer<
  typeof getActivitiesResponseOffsetSchema
>;

export type ActivitySearchFormValues = z.infer<typeof activitySearchSchema>;
