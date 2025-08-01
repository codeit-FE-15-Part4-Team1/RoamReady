import z from 'zod';

import { API_ENDPOINTS } from '@/shared/constants/endpoints';
import { apiClient } from '@/shared/libs/apiClient';

export const deleteMyReservation = async (reservationId: number) => {
  const validatedReservationId = z.number().positive().parse(reservationId);

  return await apiClient
    .patch(API_ENDPOINTS.MY_RESERVATIONS.BASE + `/${validatedReservationId}`, {
      json: { status: 'canceled' },
    })
    .json<void>();
};
