import z from 'zod';

// -------------------- 스키마 정의 --------------------
export const reservationStatusSchema = z.enum(
  ['pending', 'confirmed', 'declined', 'canceled', 'completed'],
  {
    errorMap: () => ({
      message:
        'status는 pending, confirmed, completed, declined, canceled  중 하나로 입력해주세요.',
    }),
  },
);

export const reservationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activity: z.object({
    bannerImageUrl: z.string(),
    title: z.string(),
    id: z.number(),
  }),
  scheduleId: z.number(),
  status: reservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GetMyReservationsRequestSchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
  status: reservationStatusSchema.optional(),
});

export const GetMyReservationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  reservations: z.array(reservationSchema),
  totalCount: z.number(),
});

// -------------------- 타입 정의 --------------------

export type GetMyReservationsRequest = z.infer<
  typeof GetMyReservationsRequestSchema
>;
export type GetMyReservationsResponse = z.infer<
  typeof GetMyReservationsResponseSchema
>;
export type Reservation = z.infer<typeof reservationSchema>;
export type ReservationStatus = z.infer<typeof reservationStatusSchema>;
