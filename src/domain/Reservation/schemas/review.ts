import z from 'zod';

export const createReservationReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(1000),
});

export const createReservationReviewResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  activityId: z.number(),
  userId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateReservationReview = z.infer<
  typeof createReservationReviewSchema
>;
export type CreateReservationReviewResponse = z.infer<
  typeof createReservationReviewResponseSchema
>;
